import styled from "styled-components";
import { keyframes } from "styled-components";

const breatheAnimation = keyframes`
 0% { opacity: 1 }
 100% { opacity: 0; }
`;

export const TextStyle = styled.h1`
  text-align: center;
  line-height: 1;
`;
export const FormStyle = styled.div`
  text-align: center;
  line-height: 4;
  position: relative;
  background: snow;
  top: 25%;
  margin: 20px;
  height: 500px;
  width: 550px;
  border-radius: 10px;
  font-size: larger;
  font-family: serif;
`;
export const Slide = styled.div`
  opacity: 1;
  transition-timing-function: ease-out;

  transition-property: opacity;
  transition-duration: 5s;
  border: 1px solid;
  max-width: 400px;
  height: 400px;
`;
export const SlyderStyle = styled.img`
  object-fit: cover;
  height: 400px;
`;
export const BackgroundLogin = styled.div`
  background-color: transparent;
  background-size: cover;
  position: absolute;
  background-repet: no-repeat;
  width: 100%;
  height: 100%;
  text-align: center;
  padding-top: 1%;
  margin-top: 20px;
`;
