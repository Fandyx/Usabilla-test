import { createStore } from "redux";
import rootReducer from "../index";
import reviews from "../reviews";
let store = createStore(rootReducer);
describe("rootReducer", () => {
  it("should match initial state", () => {
    expect(store.getState().reviews).toEqual(reviews(undefined, {}));
  });
  it("should handle actions", () => {
    expect(store.getState().reviews).toEqual({
      count: 0,
      isLoading: false,
      list: []
    });
  });

  it("should handle actions", () => {
    let action = { type: "FETCH_REVIEWS_START" };
    store.dispatch(action);
    expect(store.getState().reviews).toEqual(reviews(undefined, action));
  });
  it("should match state", () => {
    expect(store.getState().reviews).toEqual({
      count: 0,
      isLoading: true,
      list: []
    });
  });
});
