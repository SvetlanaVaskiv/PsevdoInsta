const express = require("express");
const app = require("express")();
const fs = require("fs"); //для заливки файлов
const bodyParser = require("body-parser");
const { Sequelize, DataTypes, Model, where } = require("sequelize");
const sequelize = new Sequelize("mysql://admin:password@localhost/insta");
const { graphqlHTTP: express_graphql } = require("express-graphql");
const { buildSchema } = require("graphql");
const SECRET = "big big SeCret";
const jwt = require("jsonwebtoken");
const uploadPath = `public/upload`;
const sharp = require("sharp");

function jwtCheck(req, secret) {
  const authorization = req && req.headers && req.headers.authorization;

  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.substr("Bearer ".length);
    let decoded;
    try {
      decoded = jwt.verify(token, secret);
    } catch (e) {
      return new null();
    }
    return decoded;
  }
}
app.use(express.static("public"));
const multer = require("multer");
const upload = multer({ dest: uploadPath });

app.post("/upload", upload.single("avatar"), async function (req, res, next) {
  let filedata = req.file;
  console.log(filedata);
  const jwt = jwtCheck(req, SECRET);
  if (!filedata || !jwt) res.send(JSON.stringify("Error loading file"));

  if (jwt) {
    let userId = jwt.sub;
    let url = filedata.path.replace(/^public\//, "");
    let originalFileName = filedata.filename;
    let image = await Image.create({
      url: url,
      originalFileName: originalFileName,
      UserId: userId,
    });
    res.send(image);
  }
});

class User extends Model {
  get age() {
    const now = new Date().getTime();
    const ageInMs = now - this.birthday.getTime();
    const yearInMS = 1000 * 60 * 60 * 24 * 365.25;
    return ageInMs / yearInMS;
  }
  get user() {
    return this.getUser();
  }
  set user(user) {
    this._user = user;
  }
  get avatar() {
    return this.getAvatar();
  }
  set avatar(avatar) {
    this._avatar = avatar();
  }
  get likes() {
    return this.getLikes();
  }
  set likes(likes) {
    this._likes = likes();
  }
}
User.init(
  {
    username: {
      type: DataTypes.STRING(64),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
    },
    birthday: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ["username"],
      },
    ],
    sequelize,
    modelName: "User",
  }
);

class Post extends Model {
  get owner() {
    return this.getUser();
  }

  set owner(user) {
    this._user = user;
  }
  get images() {
    return this.getImages();
  }
  get comments() {
    return this.getComments();
  }
}
Post.init(
  {
    title: Sequelize.STRING,
    text: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "Post" }
);

class Image extends Model {
  get owner() {
    return this.getUser();
  }
  set owner(user) {
    this._user = user;
  }
}
Image.init(
  {
    url: {
      type: DataTypes.STRING,
    },
    originalFileName: {
      type: DataTypes.STRING,
    },
    isAvatar: {
      type: DataTypes.BOOLEAN,
    },
  },
  { sequelize, modelName: "Image" }
);

class Comment extends Model {
  get owner() {
    return this.getUser();
  }
  set owner(user) {
    this._user = user;
  }
  get post() {
    return this.getPost();
  }
}
Comment.init(
  {
    text: {
      type: DataTypes.TEXT,
    },
    title: {
      type: DataTypes.STRING,
    },
  },
  { sequelize, modelName: "Comment" }
);

class Like extends Model {
  get owner() {
    return this.getUser();
  }
  set owner(user) {
    this._user = user;
  }
  get post() {
    return this.getPost();
  }
}
Like.init({}, { sequelize, modelName: "Like" });

class Subscription extends Model {}
Subscription.init(
  {
    followingId: {
      type: DataTypes.INTEGER,
    },
  },
  { sequelize, modelName: "subscription" }
);

User.belongsToMany(User, {
  as: "followers",
  through: Subscription,
  foreignKey: "followingId",
});
User.belongsToMany(User, { as: "followings", through: Subscription });
User.hasMany(Image, {
  as: "avatar",
  scope: {
    isAvatar: true,
  },
});
User.hasMany(Image);
Image.belongsTo(User);
User.hasMany(Post);
User.hasMany(Comment);
Post.hasMany(Image);
Image.belongsTo(Post);
User.belongsToMany(Post, {
  through: Like,
  as: "postLikes",
});
Post.belongsToMany(User, { through: Like, as: "likers" });
Post.belongsTo(User);
Post.hasMany(Comment);
Comment.belongsTo(Post);
Comment.belongsTo(User);
Comment.belongsTo(Comment, { as: "parent", sourceKey: "parentId" });
Comment.hasMany(Comment, { as: "answers", foreignKey: "parentId" });

(async () => {
  try {
    const vasya = await User.create({
      username: "vasya",
      email: "vasya@mail.com",
      birthday: "2003-08-21",
      password: "12345",
    });
    const kolya = await User.create({
      username: "kolya",
      email: "kolya@mail.com",
      birthday: "2008-10-03",
      password: "oikjh",
    });
    const hanna = await User.create({
      username: "hanna",
      email: "hanna@mail.com",
      birthday: "2058-10-03",
      password: "hanna",
    });
    const vanya = await User.create({
      username: "vanya",
      email: "vanya@mail.com",
      birthday: "2003-01-28",
      password: "vanya",
    });
    const lilia = await User.create({
      username: "lilia",
      email: "lilia@mail.com",
      birthday: "2808-10-03",
      password: "lilia",
    });
    const misha = await User.create({
      username: "misha",
      email: "misha@mail.com",
      birthday: "1258-10-03",
      password: "misha",
    });
    const post2 = await kolya.createPost({
      title: "post 2",
      text: "		Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo non nisi veritatis autem eos in, ad obcaecati, corrupti laborum ipsam, laboriosam fugiat labore ut quod odio? Quas ducimus perferendis asperiores!",
    });
    const post3 = await hanna.createPost({
      title: "post 3",
      text: "		Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo non nisi veritatis autem eos in, ad obcaecati, corrupti laborum ipsam, laboriosam fugiat labore ut quod odio? Quas ducimus perferendis asperiores!",
    });
    const post4 = await lilia.createPost({
      title: "post 4",
      text: "		Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo non nisi veritatis autem eos in, ad obcaecati, corrupti laborum ipsam, laboriosam fugiat labore ut quod odio? Quas ducimus perferendis asperiores!",
    });
    const post5 = await vasya.createPost({
      title: "post 5",
      text: "		Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo non nisi veritatis autem eos in, ad obcaecati, corrupti laborum ipsam, laboriosam fugiat labore ut quod odio? Quas ducimus perferendis asperiores!",
    });
    await kolya.addFollowings(vasya);
    await kolya.addFollowings(misha);
    await kolya.addFollowings(lilia);
    await misha.addFollowings(kolya);
    await misha.addFollowings(lilia);
    await misha.addFollowings(hanna);
    await lilia.addFollowings(misha);

    await hanna.addFollowings(misha);
    await vasya.addFollowings(misha);
    await lilia.addFollowings(misha);

    await misha.addFollowers(kolya);
    await misha.addFollowers(hanna);
    await misha.addFollowers(vasya);
    await misha.addFollowers(lilia);
    await misha.createImage({
      url: "upload/15bd3e4a76ff9c3d81d13a6a13d2fba7",
      originalFileName: "sign_up_bcg.jpg",
    });
    await kolya.createImage({
      url: "upload/164fc965ef9cd19c16ad2257efe0d97f",
      originalFileName: "sign_up_bcg.jpg",
      isAvatar: true,
    });
    await lilia.createImage({
      url: "upload/c0d1f6d7c914d1ce965c3edb4a1a251c",
      originalFileName: "sign_up_bcg.jpg",
    });
    await vasya.createImage({
      url: "upload/a58fdb94135c04bf5c0e04fa37e581cd",
      originalFileName: "sign_up_bcg.jpg",
      isAvatar: true,
    });
    await lilia.createAvatar({
      url: "upload/b9590bcdd979d9cc6fca8af7e1214167",
      originalFileName: "avatar.jpg",
      isAvatar: true,
    });
    await hanna.createImage({
      url: "upload/cde624ff41cc3604802585d57edcf895",
      originalFileName: "sign_up_bcg.jpg",
    });
    await hanna.createImage({
      url: "upload/d7b8d63669159b95bfe10bf9c7f5c1a4",
      originalFileName: "sign_up_bcg.jpg",
      isAvatar: true,
    });
    await kolya.createImage({
      url: "upload/15bd3e4a76ff9c3d81d13a6a13d2fba7",
      originalFileName: "sign_up_bcg.jpg",
    });
    await misha.createImage({
      url: "upload/164fc965ef9cd19c16ad2257efe0d97f",
      originalFileName: "sign_up_bcg.jpg",
    });
    await misha.createAvatar({
      url: "upload/a58fdb94135c04bf5c0e04fa37e581cd",
      originalFileName: "avatar.jpg",
      isAvatar: true,
    });

    /* console.log("LOOK IT IS FOLLOWERS", await misha.getFollowers());
    console.log("LOOK AT HERE", await kolya.getFollowings());
    console.log("HERE IS AVATAR", await misha.getAvatar());
    console.log(await User.findByPk("4"));
    console.log(await User.findByPk(5));*/
    const post = await vasya.createPost({ title: "post 1", text: "i am cool" });
    const vasya2 = await User.findOne({ where: { username: "vasya" } });
    console.log(await User.findAll({ where: { username: "kolya" } }));
    for (let user of await User.findAll()) {
      await user.createPost({
        title: `${user.username} hello i am here`,
        text: "wtf",
      });
      await user.save();
    }
  } catch (err) {
    console.log(err);
  }
})();
console.log(User.prototype);
console.log("LIKES", Like.prototype);

const schema = buildSchema(`
    type Query {
        getPosts(query: String): [Post]
				PostFindOne(id:ID):Post
        getComments(id:ID): [Comment]
				login( username: String!, password: String!) : String
				getImage: [Image]
				UserFindOne(id: ID): User
				getUsers: [User]
				getAvatar: [Image]
				getAllPosts:[Post]
    }
    type Mutation { 
			registration (user: UserInput) : User
			addPost(text: String, title: String, imageId: ID): Post
			deletePost(input: PostInput) : Post
      createComment(comment: CommentInput): Comment
			deleteComment(input: CommentInput) : Comment
			addImage(input:ImageInput ) : Image
			setUsers(id: ID!) : Boolean
			createAvatar(id: ID) : [Image]
			createLike(id:ID): [Like]
    }
		type Image {
			id: ID,
			url: String,
			originalFileName: String,
			isAvatar: Boolean,
			createdAt: String,
			owner: User
			PostId: ID
	}

	input ImageInput {
		id:ID,
			url: String,
			originalFileName: String,
			isAvatar: Boolean,
			createdAt: String,
}
type User{
	id: ID,
	age: Int,
	email: String,
	createdAt: String,
	username : String,
	avatar: [Image],
	post: [Post]
	likes: [Like],
	birthday: String,
	incomings: [Direct],
	user : User, 
	followingId : Int
}
input UserInput {
	email: String,
	birthday: String,
	password: String, 
	username : String,
	avatar: ImageInput,
}
type Subscription{
	createdAt: String,
	followingId: ID,
	UserId: ID
}
    type Post {
        id: ID,
        title: String,
        text:  String,
				createdAt: String,
        comments: [Comment],
				images: [Image],
				directs: [Direct],
				likes: [Like]
				owner : User
    }
		input PostInput {
			id: ID,
			title: String,
			text: String,
			images: [ImageInput],
			comments: [CommentInput],
			directs: [DirectInput],
	}

		type Comment {
			id:ID,
			title: String,
			text: String,
			createdAt: String,
			post: Post,
			answers: [Comment],
			answerTo: Comment
			likes: [Like]
			owner: User
		}
		input CommentInput {
			title: String,
			id: ID,
			text: String,
			post: PostInput,
			answers: [CommentInput],
			answerTo: CommentInput	
			}
	
		type Like {
			post: Post,
			comment: Comment,
			direct: Direct,
UserId: ID
	} 
	input LikeInput {
		id: ID,
		post: PostInput,
		comment: CommentInput,
		direct: DirectInput,
		user: UserInput,
}
type Direct {
	id: ID,
	createdAt: String,
	text: String,
	post: Post,
	image: Image,
	likes: [Like]
	to: User
	owner: User
}

input DirectInput {
	id: ID,
	text: String,
	post: PostInput,
	image: ImageInput,
	likes: [LikeInput]
	to: UserInput
}

`);

const resolvers = {
  async getPosts({ id }, { thisUser }) {
    if (!thisUser) return null;
    let followings = await thisUser.getFollowings();
    const usersId = followings.map((item) => item.id);
    usersId.push(thisUser.id);
    const { Op } = require("sequelize");
    if (followings.length === 0) return null;
    const fullPost = await Post.findAll(
      {
        where: { UserId: { [Op.in]: usersId } },
        order: [["createdAt", "DESC"]],
      },
      {
        include: Image,
        where: {
          id: Post.id,
        },
      },
      { limit: 90, skip: 10 }
    );
    return fullPost;
  },
  async getAllPosts({}, { thisUser }) {
    if (!thisUser) return null;
    const { Op } = require("sequelize");
    let followings = await thisUser.getFollowings();
    const usersId = followings.map((item) => item.id);
    usersId.push(thisUser.id);
    const postss = await Post.findAll({
      where: { UserId: { [Op.not]: usersId } },

      order: [["createdAt", "DESC"]],
    });
    return postss;
  },
  async getImage({ id }, { thisUser }) {
    const followings = await thisUser.getFollowings();
    const usersId = followings.map((item) => item.id);
    const image = await Image.findAll(
      { limit: 90, skip: 10 },
      { where: { UserId: usersId } }
    );
    return image;
  },
  async createAvatar({ id }, { thisUser }) {
    try {
      if (!thisUser) return null;
      const createAva = await thisUser.createAvatar();
      const avaId = await thisUser.getAvatar(id);
      if (createAva) return avaId;
    } catch (errors) {
      return errors;
    }
  },
  async getAvatar({ id }, { thisUser }) {
    if (!thisUser) return null;
    const user = await thisUser.getAvatar(id);
    return user;
  },
  async getComments({ id }, { thisUser }) {
    const comment = await Comment.findAll({ where: { PostId: id } });
    return comment;
  },
  async createLike({ id }, { thisUser }) {
    const like = await thisUser.addPostLike(id);
    console.log(like.map((data) => data.dataValues));
    return like;
  },
  async setUsers({ id }, { thisUser }) {
    try {
      const user = await User.findByPk(id);
      const add = await thisUser.addFollowing(id);
      if (add) return true;
    } catch (errors) {
      return (errors = false);
    }
  },
  registration({ user }) {
    return User.create(user);
  },

  async PostFindOne({ id }) {
    const post = await Post.findByPk(id, {
      include: Comment,
      where: {
        PostId: id,
      },
    });

    return post;
  },
  async UserFindOne({ id }) {
    const user = await User.findByPk(id);
    return user;
  },
  async login({ username, password }) {
    const user = await User.findOne({
      where: { username: username, password: password },
    });
    if (!username || !password) return null;
    if (!user) return null;
    return jwt.sign(
      { sub: user.id, username: user.username, birthday: user.birthday },
      SECRET
    );
  },
  async addPost({ text, title, imageId }, { thisUser }) {
    if (!thisUser) return null;

    const input = { text, title, imageId };
    console.log(imageId);
    let postss = await thisUser.createPost(input);
    let postId = postss.dataValues.id;
    let createImage = await Image.update(
      { PostId: postId },
      {
        where: {
          id: imageId,
        },
      }
    );
    /*  console.log("CREATE", createImage);
    let findPost = await Post.findOne({
      include: Image,
      where: {
        id: postId,
      },
    });
    console.log("POST", findPost);*/
    return postss;
  },

  async createComment({ comment }, { thisUser }) {
    if (!thisUser) return null;
    id = comment.post.id;
    const newComment = await thisUser.createComment(comment);
    newComment.PostId = id;
    return newComment.save();
  },
  async updatePost({ id, title, text }, { thisUser }) {
    if (!thisUser) return null;
    const post = await Post.findByPk(id);
    if (!(await thisUser.hasPost(post))) return null;
    post.title = title || post.title;
    post.text = text || post.text;
    return await post.save();
  },
};

app.use(
  "/graphql",
  express_graphql(async (req, res) => {
    const jwt = jwtCheck(req, SECRET);
    if (jwt) {
      const thisUser = await User.findByPk(jwt.sub);
      return {
        schema, //jwt
        rootValue: resolvers,
        graphiql: true,
        context: { jwt, thisUser },
      };
    }
    return {
      schema, //anon
      rootValue: resolvers,
      graphiql: true,
      context: {},
    };
  })
);

app.use(express.static("public"));

sequelize
  .sync()
  //.sync({ force: true })
  .then(() => {
    console.log("Tables have been created");
  })
  .catch((err) => console.log(err));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.sendFile(path.join("public", "index.html"));
});

app.listen(4000, () => {
  console.log("App listening on port 4000!");
});
