import { useHistory } from "react-router-dom";
import { React } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ImagePost } from "./StyledAllPosts";
import store from "../../../redux/index";
import { Box, CardActionArea } from "@mui/material";
import { connect } from "react-redux";

import { actionAddFollowing } from "../../../redux/actions";
import { Button } from "react-bootstrap";

export const AllPost = ({
  post: {
    title,
    text,
    createdAt,
    comments,
    owner: { username, avatar, id },
    images,
  },
  addFollowings,
}) => {
  const history = useHistory();
  const userId = store.getState().authReducer.payload.sub;
  const parsed = parseInt(createdAt);
  let date = new Date(parsed).toLocaleString();
  let avaJSX = avatar?.map((item) => (
    <Avatar alt={title} src={`http://localhost:4000/${item.url}`} key={item.id} />
  ));

  let imagesJSX =
    images &&
    images.map((item) => (
      <ImagePost src={`http://localhost:4000/${item.url}`} alt={title} key={item.id}/>
    ));
  const goToComment = () => {
    history.push(`/comments/post${id}`);
  };
  let com = comments?.map((item) => item.id);
  let count = com.length;
  const newuserId = id;

  const addNewFollowings = () => {
    addFollowings(newuserId);
    history.push(`/news`);
  };

  return (
    <div>
      <Card sx={{ maxWidth: 750 }} key={id}>
        <CardHeader
          avatar={avaJSX}
          action={
            <Button
              onClick={(e) => {
                addNewFollowings(e);
              }}
            >
              Follow
              <MoreVertIcon />
            </Button>
          }
          title={username}
          subheader={date}
        />
        {imagesJSX}
        <CardContent>
          <Box sx={{ bgcolor: "#cfe8fc", height: "15vh" }}>{text}</Box>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
        </CardActions>
        <CardActionArea
          onClick={(e) => {
            goToComment(e);
          }}
          id={id}
        >
          <Typography variant="body2" color="text.secondary">
            VIEW ALL {count} COMMENTS
          </Typography>
        </CardActionArea>
      </Card>
    </div>
  );
};
const CAllPosts = connect(
  (state) => ({
    posts: state.promise.getAllPosts?.payload,
  }),
  { addFollowings: actionAddFollowing }
)(AllPost);
export default CAllPosts;
