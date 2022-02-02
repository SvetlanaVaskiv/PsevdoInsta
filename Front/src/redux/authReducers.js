export function authReducer(state, action) {
  if (state === undefined) {
    if (localStorage.authToken || localStorage.authToken === null) {
      action.type = "LOGIN";
      action.token = localStorage.authToken;
    } else {
      return {};
    }
  }
  if (action.type === "LOGIN") {
    console.log("LOGIN");
    localStorage.setItem("authToken", action.token);
    const getJwt = localStorage.authToken.split(".")[1];
    const decoded = JSON.parse(atob(getJwt));
    return { token: action.token, payload: decoded };
  }
  if (action.type === "LOGOUT") {
    console.log("LOGOUT");
    localStorage.removeItem("authToken");

    return {};
  }
  if (action.type === "ERRORLOG") {
    console.log("ERRORLOG");
    const message = "Go to registration";
    return {
      error: message,
    };
  }

  if (action.type === "ERRORREG") {
    console.log("ERRORREG");
    const message = "User has already exist";
    return {
      error: message,
    };
  }

  return state;
}
