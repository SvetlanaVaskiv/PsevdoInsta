import { React, useState, useEffect } from "react";
import { connect } from "react-redux";
import { ationGetFullNews } from "../../../redux/actions";
import { Footer } from "../../Footer";
import { Post } from "./Post";
import { BackgroundNews, styledList } from "./StyledNews";
import bcg from "../../../images/maxresdefault.jpg";
import { Link } from "react-router-dom";
import { routers } from "../../../utils/routes";

const News = ({ news, getPosts }) => {
  news = news || [];
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      {" "}
      <BackgroundNews style={{ backgroundImage: `url(${bcg})` }}>
        <styledList>
          {news.map((post) => (
            <Post post={post} />
          ))}
        </styledList>
        {news.length === 0 && (
          <div
            style={{
              border: "1px solid red",
              padding: 50,
              margin: 50,
              height: "100vh",
            }}
          >
            <Link to={routers.SEARCH.path}>Find new friends</Link>
          </div>
        )}
        <Footer />
      </BackgroundNews>
    </>
  );
};
const ConnectNews = connect(
  (state) => ({
    news: state.promise.getPosts?.payload,
  }),
  { getPosts: ationGetFullNews }
)(News);
export default ConnectNews;
