import { ActionTypes } from "../constants/actionTypes";

let initialState = {
  post: {},
  posts: [],
  loading: true,
};

export const postReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
      };
    case ActionTypes.POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case ActionTypes.GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false,
      };
    // case ActionTypes.GET_POST:
    //   return {
    //     ...state,
    //     post: payload,
    //     loading: false,
    //   };
    case ActionTypes.DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post._id.toString() !== payload),
      };
    default:
      return state;
  }
};
