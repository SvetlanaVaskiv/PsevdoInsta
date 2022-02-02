import { Link, useHistory } from "react-router-dom";
import { React } from "react";
import { Card } from "react-bootstrap";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ImagePost, LayoutNewsPage } from "./StyledNews";
import { CardActionArea } from "@mui/material";
import store from "../../../redux";
import Button from "react-bootstrap/Button";
import bcg from "../../../images/comments.jpeg";

export const Post = ({
  post: {
    id,
    title,
    text,
    createdAt,
    comments,
    owner: { username, avatar },
    images,
  },
}) => {
  const history = useHistory();
  const userId = store.getState().authReducer.payload.sub;
  const parsed = parseInt(createdAt);
  let date = new Date(parsed).toLocaleString();
  let avaJSX = avatar?.map((item) => (
    <Avatar alt={title} src={`http://localhost:4000/${item.url}`} />
  ));
  let com = comments?.map((item) => item.id);
  let count = com.length;
  let imagesJSX =
    images &&
    images.map((item) => (
      <ImagePost src={`http://localhost:4000/${item.url}`} alt={title} />
    ));
  const goToComment = () => {
    history.push(`/comments/post${id}`);
  };
  return (
    <LayoutNewsPage>
      <Card sx={{ maxWidth: 750 }} key={id}>
        <CardHeader
          avatar={avaJSX}
          action={
            <Link to={`/profile/user/${userId}/name/${username}`}>
              <Button>
                Profile
                <MoreVertIcon />
              </Button>
            </Link>
          }
          title={username}
          subheader={date}
        />
        {imagesJSX}
        <CardContent>
          <Card>
            <Card.Body> {text}</Card.Body>
            <Card.Body> {title}</Card.Body>
          </Card>
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
          <Typography
            sx={{
              fontWeight: "600",
              fontSize: "2.875rem",
              color: "rgb(185 19 137)",
            }}
            variant="body2"
            color="text.secondary"
            style={{
              backgroundImage: `url(${bcg})`,
              backgroundRepeat: "no-repeat",
              minWidth: "100%",
              backgroundSize: "cover",
            }}
          >
            VIEW ALL {count} COMMENTS
          </Typography>
        </CardActionArea>
      </Card>
    </LayoutNewsPage>
  );
};
