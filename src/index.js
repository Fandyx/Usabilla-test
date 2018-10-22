import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import configureStore, { history } from "./store/configureStore";

const store = configureStore();

ReactDOM.render(
  <App store={store} history={history} />,
  document.getElementById("root")
);
