import fetch from "cross-fetch";
import * as types from "../constants/actionTypes";

const fetchReviewsStart = () => {
  return {
    type: types.FETCH_REVIEWS_START
  };
};

const fetchReviewsSuccess = res => {
  return {
    type: types.FETCH_REVIEWS_SUCCESS,
    res
  };
};

const fetchReviewsFailure = () => {
  return {
    type: types.FETCH_REVIEWS_FAILURE
  };
};

export function fetchReviews() {
  return async dispatch => {
    try {
      dispatch(fetchReviewsStart());
      const res = await fetch(
        `https://cors-anywhere.herokuapp.com/https://static.usabilla.com/recruitment/apidemo.json`
      );
      if (res.status >= 400) {
        dispatch(fetchReviewsFailure());
      }
      const json = await res.json();
      dispatch(fetchReviewsSuccess(json));
    } catch (err) {
      dispatch(fetchReviewsFailure());
    }
  };
}
