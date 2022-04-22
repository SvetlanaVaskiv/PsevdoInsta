import React, { useEffect } from "react";

import { actionAuthLogout, actionUserInfo } from "../../../redux/actions";
import CDrop from "../../DropZone/DropZone";
import { useState } from "react";

import { connect, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { BackgroundLogin } from "../../LogIn/LogInStyle";
import bcg from "../../../images/friend.jpg";
import Button from "react-bootstrap/Button";
import { Layout } from "../../SignUp/SignUpStyles";
import { Form } from "react-bootstrap";

const Settings = ({ info, onSignUp, check }) => {
  const history = useHistory();
  if (localStorage.authToken === undefined || null) {
    history.push("/login");
  }
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(actionUserInfo());
  }, []);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [show, setShow] = useState(false);

  const isvalid = () => {
    ///change the validation
    if (!username || !password || !email || !birthday) {
      return false;
    } else return true;
  };
  const signUpCallback = () => {
    if (isvalid) {
      onSignUp(username, password, email, birthday);
    } else {
      setShow(true);
    }
  };

  return (
    <>
      <BackgroundLogin style={{ backgroundImage: `url(${bcg})` }}>
        <div>
          <CDrop info={info}></CDrop>
        </div>
        <Layout>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>LOGIN</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>PASSWORD</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>EMAIL</Form.Label>
              <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>BIRTHDAY</Form.Label>
              <Form.Control
                type="date"
                placeholder="Birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </Form.Group>
            <Button
              variant="primary"
              name="Login"
              onClick={(e) => {
                signUpCallback(e);
              }}
            >
              UPDATE DATE
            </Button>
          </Form>
        </Layout>
      </BackgroundLogin>
    </>
  );
};
const ConnectSettings = connect(
  (state) => ({
    info: state.promise?.UserInfo?.payload,
  }),
  { onLogOut: actionAuthLogout }
)(Settings);
export default ConnectSettings;
