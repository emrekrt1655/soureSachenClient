import { AUTH, ALERT } from "../types/types";
import { postAPI } from "../../utils/api";

export const login = (userLogin) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("login", userLogin);
    console.log(res);
    dispatch({
      type: AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });
    dispatch({ type: ALERT, payload: { success: "Login Success!" } });
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.message } });
  }
};
