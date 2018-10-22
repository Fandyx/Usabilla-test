import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
// import { create } from "react-test-renderer"
it("renders without crashing", () => {
  const middlewares = [thunk];
  const reviews = {
    list: [],
    isLoading: false,
    count: 0
  };
  const store = configureMockStore(middlewares)({ reviews });
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
