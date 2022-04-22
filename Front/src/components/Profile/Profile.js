import React, { useEffect } from "react";
import { CardActionArea, Switch, Typography, Button } from "@mui/material";
import {
  Controller,
  LayoutProfile,
  LayoutProfilePage,
  ProfileImage,
  UserInfo,
} from "./StyledProfile";
import { actionAuthLogout, actionUserInfo } from "../../redux/actions";
import store from "../../redux/index";
import { useHistory, useParams } from "react-router-dom";
import CDrop from "../DropZone/DropZone";
import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import { BackgroundLogin } from "../LogIn/LogInStyle";
import bcg from "../../images/profileBcg.jpg";
import { BackgroundNews } from "../Main/News/StyledNews";

const Profile = ({ onLogOut, info }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  console.log("IDDDD", id);
  useEffect(() => {
    dispatch(actionUserInfo());
  }, []);

  const username = info?.username;
  const birthday = info?.birthday;
  const parsed = parseInt(birthday);
  let date = new Date(parsed).toLocaleString().split(",")[0];
  const email = info?.email;
  let avaJSX = info?.avatar?.map((item) => (
    <ProfileImage alt={username} src={`http://localhost:4000/${item.url}`} />
  ));
  const history = useHistory();
  if (localStorage.authToken === undefined || null) {
    history.push("/login");
  }
  const goToSettings = () => {
    history.push(`/settings/user${id}`);
  };
  useEffect(() => {
      },[goToSettings])
  return (
    <>
      {" "}
      <BackgroundLogin style={{ backgroundImage: `url(${bcg})` }}>
        <LayoutProfilePage>
          <Controller
            control={<Switch defaultChecked />}
            label="Log Out"
            onClick={() => onLogOut()}
          />
          <div>{avaJSX}</div>
          <LayoutProfile>
            {username}
            <Typography variant="h5" gutterBottom component={UserInfo}>
              {username}
            </Typography>

            <Typography variant="h5" gutterBottom component={UserInfo}>
              {date}
            </Typography>

            <Typography variant="h5" gutterBottom component={UserInfo}>
              {email}
            </Typography>
            <Button color="secondary" onClick={(e) => goToSettings(e)}>
              Change date
            </Button>
          </LayoutProfile>
        </LayoutProfilePage>
      </BackgroundLogin>
    </>
  );
};
const ConnectProfile = connect(
  (state) => ({
    info: state.promise?.UserInfo?.payload,
  }),
  { onLogOut: actionAuthLogout }
)(Profile);
export default ConnectProfile;
