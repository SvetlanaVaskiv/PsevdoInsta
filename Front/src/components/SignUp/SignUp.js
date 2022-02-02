import React from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { routers } from "../../utils/routes";
import { BackgroundLogin } from "../LogIn/LogInStyle";
import bcg from "../../images/sign_up_bcg.jpg";
import { Layout, Header, Recommendation, PathToLogin } from "./SignUpStyles";
import { actionFullRegister } from "../../redux/actions";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

const SignUp = ({ onSignUp, registerError, registerPassed, loginPassed }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [show, setShow] = useState(false);

  const history = useHistory();

  const isValid = () => {
    ///change the validation
    if (!username || !password || !email || !birthday) {
      return false;
    } else return true;
  };
  const signUpCallback = () => {
    if (isValid()) {
      onSignUp(username, password, email, birthday);
    } else {
      setShow(true);
    }
  };
  if (registerPassed) {
    history.push("/login");
  }
  if (loginPassed) {
    history.push("/news");
  }

  return (
    <>
      <BackgroundLogin style={{ backgroundImage: `url(${bcg})` }}>
        <Layout>
          <Form>
            <Header>PsevdoInsta</Header>
            <div style={{ flex: "1 1 50%" }}>
              <Recommendation>
                Register to watch photos and videos of your friends.
              </Recommendation>

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
              <p>
                By registering, you agree to our Terms, Data Policy and Cookie
                Policy.
              </p>
              <Button
                variant="primary"
                name="Login"
                isValid={isValid()}
                onClick={(e) => {
                  signUpCallback(e);
                }}
              >
                Registration
              </Button>
              {registerError && (
                <div
                  style={{ border: "1px solid red", padding: 10, margin: 20 }}
                >
                  <Link to={routers.LOGIN.path}> Go to Login</Link>
                </div>
              )}
              <PathToLogin>
                <p>Have an account?</p>{" "}
                <Link to={routers.LOGIN.path}> Go to Login</Link>
              </PathToLogin>
            </div>
          </Form>
        </Layout>
      </BackgroundLogin>
    </>
  );
};

const ConnectReg = connect(
  (state) => ({
    registerError: state.promise?.registrarion?.error,
    registerPassed: state.promise?.registrarion?.payload,
    loginPassed: state.authReducer?.payload,
  }),
  { onSignUp: actionFullRegister }
)(SignUp);
export default ConnectReg;
