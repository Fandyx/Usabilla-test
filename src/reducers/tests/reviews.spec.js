import * as ActionTypes from "../../constants/actionTypes";
import reducer from "../reviews";
import initialState from "../initialState";

describe("Reducers::Reviews", () => {
  const getInitialState = () => {
    return initialState().reviews;
  };

  it("should set initial state by default", () => {
    const action = { type: "unknown" };
    const expected = getInitialState();
    expect(reducer(undefined, action)).toEqual(expected);
  });

  it("should handle FETCH_REVIEWS_START", () => {
    const appState = {
      reviews: {
        list: [],
        isLoading: false,
        count: 0
      }
    };
    const action = { type: ActionTypes.FETCH_REVIEWS_START };
    const expected = { count: 0, isLoading: true, list: [] };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle FETCH_REVIEWS_SUCCESS", () => {
    const appState = {
      reviews: {
        list: [],
        isLoading: true,
        count: 0
      }
    };
    const action = {
      type: ActionTypes.FETCH_REVIEWS_SUCCESS,
      res: { items: [1, 2, 3], count: 100 }
    };
    const expected = { count: 100, isLoading: false, list: [1, 2, 3] };

    expect(reducer(appState, action)).toEqual(expected);
  });

  it("should handle FETCH_REVIEWS_FAILURE", () => {
    const appState = {
      reviews: {
        list: [],
        isLoading: true,
        count: 0
      }
    };

    const action = {
      type: ActionTypes.FETCH_REVIEWS_FAILURE,
      response: "error"
    };
    const expected = { count: 0, isLoading: false, list: [] };

    expect(reducer(appState, action)).toEqual(expected);
  });
});
