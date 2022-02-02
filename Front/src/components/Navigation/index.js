import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { routers } from "../../utils/routes";
import { useHistory } from "react-router-dom";
import store from "../../redux/index";
import { actionFullRegister, actionUserInfo } from "../../redux/actions";
import { connect, useSelector } from "react-redux";

const Navigation = ({ login, newsWithProfile }) => {
  const userId = store.getState().authReducer?.payload?.sub;
  const username = store.getState().authReducer?.payload?.username;

  return (
    <nav>
      {localStorage.authToken && (
        <NavLink
          to={routers.NEWS.path}
          activeStyle={{ color: "red" }}
          style={{ color: "purple", margin: 20 }}
        >
          NEWS
        </NavLink>
      )}
      {localStorage.authToken && (
        <NavLink
          to={`/profile/user/${userId}/name/${username}`}
          activeStyle={{ color: "red" }}
          style={{ color: "purple", margin: 20 }}
        >
          PROFILE
        </NavLink>
      )}
      {localStorage.authToken && (
        <NavLink
          to={`/settings/user${userId}`}
          activeStyle={{ color: "red" }}
          style={{ color: "purple", margin: 20 }}
        >
          SETTINGS
        </NavLink>
      )}
      {!localStorage.authToken && (
        <NavLink
          to={routers.LOGIN.path}
          activeStyle={{ color: "red" }}
          style={{ color: "purple", margin: 20 }}
        >
          LOG IN
        </NavLink>
      )}
      {!localStorage.authToken && (
        <NavLink
          to={routers.SIGNUP.path}
          activeStyle={{ color: "red" }}
          style={{ color: "purple", margin: 20 }}
        >
          SIGN UP
        </NavLink>
      )}
    </nav>
  );
};
const ConnectNavigate = connect(
  (state) => ({
    login: state.promise?.registrarion?.payload,
    newsWithProfile: state.promise?.UserInfo?.payload,
  }),
  {
    onSignUp: actionFullRegister,
  }
)(Navigation);
export default ConnectNavigate;
