// Core
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./redux/index";
import "./App.css";
// Instruments

// Pages
import App from "./App";

render(
  <BrowserRouter>
    <Provider store={store}>
      <App className="test" />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
