import { actionPromise } from "./actionPromise";

const getGQL =
  (
    url = "/graphql",
    getHeaders = () =>
      localStorage.authToken
        ? { Authorization: `Bearer ${localStorage.authToken}` }
        : {}
  ) =>
  (query = "", variables = {}) =>
    fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...getHeaders(),
      },
      body: JSON.stringify({ query, variables }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.errors) {
          throw new Error(JSON.stringify(data.errors, null, 4));
        }
        const firstKey = Object.keys(data.data)[0];
        return firstKey ? data.data[firstKey] : data.data;
      });

const gql = getGQL();
//export const actionInfoSave = () => ({ type: "CHECK" });
export const actionAuthLogout = () => ({ type: "LOGOUT" });
export const LogOut = (dispatch) => dispatch(actionAuthLogout);

export const actionAuthLogin = (token) => ({ type: "LOGIN", token });

const login = async (username, password) => {
  const query = `query log($username: String!, $password: String!) {
        login(username: $username, password: $password)
      }`;
  const variables = {
    username: username,
    password: password,
  };
  const token = await gql(query, variables);
  return token;
};

export const actionLogin = (username, password) =>
  actionPromise("login", login(username, password));

export const actionPassLogin = (username, password) => {
  return async (dispatch) => {
    const result = await dispatch(actionLogin(username, password));
    if (result) {
      dispatch(actionAuthLogin(result));
      dispatch(actionUserInfo());
      dispatch(actiongetPosts());
    } else {
      dispatch(actionLogEr());
    }
  };
};
export const ationGetFullNews = () => {
  return async (dispatch) => {
    await dispatch(actiongetImages());
    await dispatch(actiongetPosts());
    await dispatch(actiongetAva());
  };
};

export const actionGetAllPosts = () => {
  return actionPromise(
    "getAllPosts",
    gql(
      `query getAllPosts{
				getAllPosts{id title text createdAt 
				comments{id text createdAt owner{id username}}
					images{id url originalFileName}
					likes{ _id owner{id}}
					owner{ id username avatar{ url id }}
				}
			}	 `
    )
  );
};
export const actionAddFollowing = (id) => async (dispatch, getState) => {
  let result = await dispatch(actionGetAllPosts());
  if (result) {
    await dispatch(
      actionPromise(
        "addFollowing",
        gql(
          `
			mutation addFoloowing($id:ID!){
				setUsers(id:$id)
			}
			`,
          { id }
        )
      )
    );
  }
};
export const actiongetPosts = () => {
  return actionPromise(
    "getPosts",
    gql(
      `query postss {
				getPosts(query: "[{}]") {
					id
					createdAt
					text
					title
					comments{id text createdAt owner{id username}}
					owner{username id 
								avatar{
											url id isAvatar originalFileName
											}
								}
					images{
						    url id originalFileName
								}
				}
			}
			 `
    )
  );
};

export const actiongetOnePost = (id) => async (dispatch) => {
  await dispatch(actiongetComments(id));
  return await dispatch(
    actionPromise(
      "getOnePost",
      gql(
        `query findPost ($id:ID){
					PostFindOne(id: $id){ 
						id text title createdAt likes{_id owner{id}} owner{username id 
						avatar{id url}
						}
						images{id url}
						comments{ text createdAt owner{id username}}
					}
				
				}`,
        { id }
      )
    )
  );
};
export const actiongetComments = (id) => async (dispatch) => {
  return await dispatch(
    actionPromise(
      "getComments",
      gql(
        `query getComments($id:ID){
					getComments(id:$id){id text createdAt owner{username}}
				}`,
        { id }
      )
    )
  );
};
export const actiongetImages = () => {
  return actionPromise(
    "getImages",
    gql(
      `query getImg{
				getImage { id url originalFileName createdAt}
			}`
    )
  );
};
export const actiongetAva = () => {
  return actionPromise(
    "getAva",
    gql(
      `query getAva{ 
				getAvatar{url id }
				}`
    )
  );
};
export const actionUserInfo = () => async (dispatch, getState) => {
  const userId = getState().authReducer.payload.sub;
  console.log("actionInfo", userId);
  await dispatch(
    actionPromise(
      "UserInfo",
      gql(
        `	query UserInfo($id: ID) {
					UserFindOne(id: $id) {
						username id birthday email avatar{id url}
					}
				}`,
        { id: userId }
      )
    )
  );
};
export const actionAddComment = (text, id) => async (dispatch, getState) => {
  const comment = { text, post: { id: id } };
  await dispatch(
    actionPromise(
      "createComment",
      gql(
        `mutation commentss($comment:CommentInput){
				createComment(comment:$comment){
				id text createdAt  post{
					id 
				}		
			}}`,

        { comment }
      )
    )
  );
  await dispatch(actiongetComments(id));
};

export const actionRegister = (username, password, email) =>
  actionPromise(
    "registrarion",
    gql(
      `mutation reg($username: String, $password: String, $email: String) {
	registration(user: {username: $username, password: $password, email: $email}) {
		id
		username
		birthday
		email
	}
}`,
      { username, password, email }
    )
  );

export const actionLogEr = (msg) => ({
  type: "ERRORLOG",
  payload: msg,
});
export const actionRegEr = (message) => ({
  type: "ERRORREG",
  payload: message,
});

export const actionFullRegister =
  (username, password, email) => async (dispatch, getState) => {
    await dispatch(actionRegister(username, password, email));
    let errorMessage = getState().promise.registrarion.error;
    if (errorMessage != null) {
      await dispatch(actionRegEr());
    }
  };
export const actionAddImage = () => async (dispatch, getState) => {
  const userId = getState().authReducer.payload.sub;
  await dispatch(
    actionPromise(
      "addImage",
      gql(
        ` mutation createAva($id: ID){
			createAvatar(id: $id) {
				id
			}
		}`,
        { id: userId }
      )
    )
  );
};

export const actionAddPost =
  (title, text, imageId, file) => async (dispatch, getState) => {
    const ides = [];

    let imageId = getState().promise?.avatar?.payload?.id;
    let result = dispatch(actionPromise("avatar", fetchFiles(file)));
    console.log(result);
    if (imageId) {
      dispatch(
        actionPromise(
          "add",
          gql(
            `
		mutation addPostsss($title: String, $text: String, $id:ID) {
			addPost(text: $text, title: $title, imageId:$id) {
				text 
	title createdAt images{url}
	owner{username }
			}
		}

`,
            { text: text, title: title, id: imageId }
          )
        )
      );
    }
    await dispatch(actiongetPosts());
  };

export const actionUploadFile = (file) => {
  return actionPromise("avatar", fetchFiles(file));
};

const fetchFiles = async (
  file,
  getHeaders = () =>
    localStorage.authToken
      ? { Authorization: `Bearer ${localStorage.authToken}` }
      : {}
) => {
  let fd = new FormData();
  fd.append("avatar", file);
  let url = document.getElementById("url");

  return fetch("/upload", {
    method: "POST",
    headers: {
      Accept: "application/json",
      ...getHeaders(),
    },
    body: fd,
  })
    .then((res) => res.json())
    .catch((err) => console.log(err));
};
