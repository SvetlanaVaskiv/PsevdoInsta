import styled from "styled-components";

export const LayoutNewsPage = styled.div`
  border-radius: 10px;
  border: solid 2px rgb(123 156 200 / 87%);
  padding: 10px;
  margin: 5px;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export const ImagePost = styled.img`
  height: 700px;
  width: 700px;
  object-fit: contain;
  margin: 0 auto;
  display: block;
`;
export const styledList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;
export const styledText = styled.div`
  background-color: antiquewhite;
  font-size: x-large;
  font-family: serif;
  border-radius: 10 px;
`;
export const BackgroundNews = styled.div`
  background-color: transparent;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 1%;
  margin-top: 20px;
`;
export const styledComments = styled.div`
  font-size: xx-large;
  font-family: cursive;
  color: #ff006e;
  font-weight: 600;
`;
