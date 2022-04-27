import { ALERT } from "../types/types";

export const typeText = (text) => async (dispatch) => {
  console.log(text);
  dispatch({
    type: ALERT,
    payload: { errors: text },
  });
};
