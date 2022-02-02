import styled from "styled-components";
import { FormControlLabel } from "@mui/material";

export const LayoutProfilePage = styled.div`
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  font-size: xx-large;
  color: #00e0ff;
  font-family: serif;
  font-weight: 600;
`;
export const LayoutProfile = styled.div`
  flex: 1 1 50%;
  flex: 1 1 50%;
  width: 500px;
  text-align: center;
  margin: 30px;
`;
export const Controller = styled(FormControlLabel)`
  position: absolute;
  right: 10px;
  margin: 0;
`;

export const UserInfo = styled.div`
  border-radius: 10px;
  border: solid 4px rgb(123 156 200 / 87%);
  overflow: auto;
  padding: 20px;
  align-items: center;
`;
export const ProfileImage = styled.img`
  border-radius: 50%;
  box-shadow: 0 0 0 3px #d1d0df, 0 0 13px #333;
  width: 300px;
  height: 300px;
  object-fit: cover;
  margin: 30px;
`;
