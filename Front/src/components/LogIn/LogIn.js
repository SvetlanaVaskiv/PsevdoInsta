import React from "react";
import { connect, useSelector } from "react-redux";
import { useState } from "react";
import { actionPassLogin } from "../../redux/actions";
import { Link, useHistory } from "react-router-dom";
import {
  TextStyle,
  FormStyle,
  LayoutLogin,
  BackgroundLogin,
  Style,
  Slide,
} from "./LogInStyle";
import bcg from "../../images/loginBcg.jpg";
import Button from "react-bootstrap/Button";
import { routers } from "../../utils/routes";
import { Form } from "react-bootstrap";

const LoginForm = ({ onLogin, logIn, loginPassed }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const history = useHistory();

  const isLoginValid = () => {
    ///change the validation
    if (!username || !password) {
      return false;
    } else return true;
  };
  const loginCallback = () => {
    if (isLoginValid()) {
      onLogin(username, password);
    } else {
      setShow(true);
    }
  };

  if (loginPassed) {
    history.push("/news");
  }

  return (
    <>
      <BackgroundLogin style={{ backgroundImage: `url(${bcg})` }}>
        <FormStyle>
          <TextStyle> Log In</TextStyle>
          <Form>
            <h3>PLEASE ENTER YOUR'S LOGIN AND PASSWORD</h3>

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

            <Button
              style={{ width: "100px" }}
              variant="primary"
              name="Login"
              isValid={isLoginValid()}
              onClick={(e) => {
                loginCallback(e);
              }}
            >
              PUSH
            </Button>
          </Form>

          {logIn && (
            <div style={{ border: "1px solid red", padding: 10, margin: 20 }}>
              <Link to={routers.SIGNUP.path}> Go to SignUp</Link>
            </div>
          )}
          {show && (!username || !password) && <h1> bad request</h1>}
        </FormStyle>
      </BackgroundLogin>
    </>
  );
};

const ConnectLog = connect(
  (state) => ({
    logIn: state.authReducer?.error,
    loginPassed: state.authReducer?.payload,
  }),
  { onLogin: actionPassLogin }
)(LoginForm);
export default ConnectLog;
