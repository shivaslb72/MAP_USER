import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { getUsers } from "./Actions/usersAction";

import "bootstrap/dist/css/bootstrap.min.css";

import configStore from "./Store/configStore";
const store = configStore();
store.dispatch(getUsers());
const jsx = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById("root"));
