import styled from "styled-components";

export const Layout = styled.div`
  display: flex;
  max-width: 50%;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-around;
  flex-wrap: nowrap;
  border: 1px solid black;
  padding: 20px;
  border-radius: 20px;
  background: #fff9f97a;
`;

export const Header = styled.h1`
  font-size: xxx-large;
  font-style: italic;
  margin: 22px auto 12px;
`;
export const Recommendation = styled.h1`
  color: #75966c;
  font-size: 19px;
  font-weight: 600;
  line-height: 20px;
  margin: 0 40px 10 px;
  text-align: center;
`;

export const PathToLogin = styled.div`
  font-family: serif;
  font-weight: 400;
  color: rgba(0, 0, 0, 0.87);
  width: 90%;
  border-radius: 4px;
  border: 1px solid #aea9a9;
  margin: 25px auto;
`;
