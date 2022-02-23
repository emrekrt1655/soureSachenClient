import { AUTH } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      return action.payload;
    default:
      return state;
  }
};
