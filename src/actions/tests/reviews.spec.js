import * as ActionTypes from "../../constants/actionTypes";
import * as ActionCreators from "../reviews";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import nock from "nock";
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Actions::Reviews", () => {
  it("works with promises", () => {
    const dispatch = jest.fn();
    const expected = {
      type: ActionTypes.FETCH_REVIEWS_START
    };
    expect(typeof ActionCreators.fetchReviews()).toEqual("function");
    ActionCreators.fetchReviews()(dispatch);
    expect(dispatch).toBeCalledWith(expected);
  });

  it("should create an action for fetch reviews success", async done => {
    nock(
      `https://cors-anywhere.herokuapp.com/https://static.usabilla.com/recruitment/apidemo.json`
    )
      .get("")
      .reply(200, { id: 1, title: "Post Title" });

    const expectedActions = [
      { type: ActionTypes.FETCH_REVIEWS_START },
      {
        res: { id: 1, title: "Post Title" },
        type: ActionTypes.FETCH_REVIEWS_SUCCESS
      }
    ];
    const store = mockStore({});

    return store.dispatch(ActionCreators.fetchReviews()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("should create an action for fetch reviews failure", async done => {
    nock(
      `https://cors-anywhere.herokuapp.com/https://static.usabilla.com/recruitment/apidemo.json`
    )
      .get("")
      .reply(500, { error: true });

    const expectedActions = [
      { type: ActionTypes.FETCH_REVIEWS_START },
      { type: ActionTypes.FETCH_REVIEWS_FAILURE },
      { res: { error: true }, type: ActionTypes.FETCH_REVIEWS_SUCCESS }
    ];
    const store = mockStore({});

    return store.dispatch(ActionCreators.fetchReviews()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });

  it("should catch network errors", async done => {
    nock(
      `https://cors-anywhere.herokuapp.com/https://static.usabilla.com/recruitment/apidemo.json`
    )
      .get("")
      .reply(500, "string");

    const expectedActions = [
      { type: ActionTypes.FETCH_REVIEWS_START },
      { type: ActionTypes.FETCH_REVIEWS_FAILURE },
      { type: ActionTypes.FETCH_REVIEWS_FAILURE }
    ];
    const store = mockStore({});

    return store.dispatch(ActionCreators.fetchReviews()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
      done();
    });
  });
});
