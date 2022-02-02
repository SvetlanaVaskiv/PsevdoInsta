import React, { useEffect } from "react";
//import bcg from "../../images/newsPhoto.jpeg";
import {
  actionAddComment,
  actionComments,
  actiongetOnePost,
} from "../../../redux/actions";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import icon from "../../../images/female.png";
import { routers } from "../../../utils/routes";
import { connect } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { BackgroundLogin } from "../../LogIn/LogInStyle";
import bcg from "../../../images/sign_up_bcg.jpg";
import Button from "react-bootstrap/Button";
import { Layout } from "../../SignUp/SignUpStyles";
import { ImagePost } from "../News/StyledNews";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
const Comments = ({ getPost, commentss, post }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actiongetOnePost(id));
  }, []);

  const [text, setText] = useState("");
  const textPost = post?.text;
  const title = post?.title;
  const parsed = parseInt(post?.createdAt);
  let date = new Date(parsed).toLocaleString();
  const username = post?.owner?.username;
  const [show, setShow] = useState(false);
  const { id } = useParams();
  const avatar = post?.owner?.avatar;
  const isValid = () => {
    ///change the validation
    if (!text) {
      return false;
    } else return true;
  };
  const sendComment = () => {
    if (isValid()) {
      getPost(text, id);
      setText("");
    } else {
      setShow(true);
    }
  };
  let comDate = commentss?.map((item) => item.createdAt);
  let letsUnParseThisShit = new Date(parseInt(comDate)).toLocaleString();
  let commentsJSX = commentss?.map((item) => (
    <Box sx={{ bgcolor: "#cfe8fc", height: "5vh", display: "contents" }}>
      <Box>{item.owner.username}</Box>
      {item.text} <sup>{letsUnParseThisShit}</sup>
    </Box>
  ));
  let avaJSX = avatar?.map((item) => (
    <Avatar alt={title} src={`http://localhost:4000/${item.url}`} />
  ));
  let imagesJSX = post?.images.map((item) => (
    <ImagePost src={`http://localhost:4000/${item.url}`} alt={title} />
  ));
  return (
    <>
      <BackgroundLogin style={{ backgroundImage: `url(${bcg})` }}>
        <Layout>
          <Card sx={{ maxWidth: 750 }} key={id}>
            <CardHeader
              avatar={avaJSX}
              action={
                <Link to={routers.NEWS.path}>
                  <Button>
                    NEWS <MoreVertIcon />
                  </Button>
                </Link>
              }
              title={username}
              subheader={date}
            />
            {imagesJSX}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {textPost}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <FavoriteIcon />
              </IconButton>
            </CardActions>
          </Card>
          {commentsJSX}

          <div style={{ flex: "1 1 50%" }}>
            <input
              label="Comment"
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Your comment"
            ></input>

            <Button
              variant="primary"
              name="Send"
              isValid={isValid()}
              onClick={(e) => {
                sendComment(e);
              }}
            >
              Send Comment
            </Button>
          </div>
        </Layout>
      </BackgroundLogin>
    </>
  );
};
const CComments = connect(
  (state) => ({
    post: state.promise.getOnePost?.payload,
    commentss: state.promise.getComments?.payload,
  }),
  { getPost: actionAddComment }
)(Comments);
export default CComments;
