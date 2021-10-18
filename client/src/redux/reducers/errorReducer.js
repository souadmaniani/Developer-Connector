import { ActionTypes } from "../constants/actionTypes";

let initialState = {};

export const errorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.GET_ERRORS:
      return payload;
    case ActionTypes.CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
};
