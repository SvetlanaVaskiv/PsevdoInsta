import styled from "styled-components";
import bcg from "../../../images/comments.jpeg";
import { Card } from "react-bootstrap";

export const LayoutNewsPage = styled.div`
  padding: 10px;
  margin: 5px;
  align-items: center;
  display: flex;
  flex-direction: column;
  max-width: 1280px;
  font-family: "emoji";
`;

export const CommentBlock = styled.div`
  font-size: xxx-large;
  font-style: italic;
  font-family: emoji;
  font-weight: 600;
  color: rgb(185 19 137);
  background: no-repeat;
  min-width: 100%;
  background-size: cover;
  background-image: url(${bcg});
  border-radius: 25px;
`;
export const ImagePost = styled.img`
  object-fit: contain;
  margin: 0 auto;
  display: block;
  width: 100%;
`;
export const styledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

export const BackgroundNews = styled.div`
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  text-align: center;
  padding: 1%;
  margin: 20px;
`;
/*export const styledComments = styled.div`
  font-size: xx-large;
  font-family: cursive;
  color: #ff006e;
  font-weight: 600;
`;*/
export const PostText = styled(Card)`
  background-color: #6495ed7d;
  text-decoration-line: underline;
`;
export const OnePost = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
  background-image: url(${bcg});
  border-radius: 25px;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 16px;
  align-items: center;
  justify-content: space-around;
  font-family: fangsong;
  letter-spacing: 2px;
  font-size: xxx-large;
  color: #e8f0f1;
  text-shadow: 1px 1px 2px red, 0 0 1em blue, 0 0 0.2em blue;
`;
