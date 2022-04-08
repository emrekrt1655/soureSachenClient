import { LIKE } from "../types/types";

export const likeReducer = (state = {}, action) => {
  switch (action.type) {
    case LIKE:
      return action.payload;
    default:
      return state;
  }
};