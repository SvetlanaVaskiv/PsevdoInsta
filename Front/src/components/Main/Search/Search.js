import { React, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import { actionGetAllPosts, actionAddFollowing } from "../../../redux/actions";
import { AllPost } from "./AllPosts";
import bcg from "../../../images/friend.jpg";
import { BackgroundNews, StyledList } from "../News/StyledNews";

const Search = ({ posts, addFollowings }) => {
  posts = posts || [];
  console.log(posts)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionGetAllPosts());
  }, [dispatch]);

  return (
    <>
      <BackgroundNews style={{ backgroundImage: `url(${bcg})` }}>
        <StyledList>
          <ul className="AllPosts">
            {posts.map((post) => (
              <AllPost post={post} key= {post.id} addFollowings={addFollowings} />
            ))}
            [;;
          </ul>
        </StyledList>
      </BackgroundNews>
    </>
  );
};
const ConnectSearch = connect(
  (state) => ({
    posts: state.promise.getAllPosts?.payload,
  }),
  { addFollowings: actionAddFollowing }
)(Search);
export default ConnectSearch;
