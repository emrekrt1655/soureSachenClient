import { ALERT } from "../types/types";

export const alertReducer = (state = {}, action) => {
  switch (action.type) {
    case ALERT:
      return action.payload;
    default:
      return state;
  }
};
