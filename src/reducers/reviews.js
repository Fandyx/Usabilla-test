import {
  FETCH_COMMENT_START,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAILURE
} from "../constants/actionTypes";
import initialState from "./initialState";

export default function reviewsReducer(state = initialState().reviews, action) {
  switch (action.type) {
    case FETCH_COMMENT_START:
      return {
        list: [],
        isLoading: true,
        count: 0
      };
    case FETCH_COMMENT_SUCCESS:
      return {
        list: action.res.items,
        isLoading: false,
        count: action.res.count
      };
    case FETCH_COMMENT_FAILURE:
      return {
        list: [],
        isLoading: false,
        count: 0
      };
    default:
      return state;
  }
}
