import { AUTH, ALERT } from "../types/types";
import { postAPI } from "../../utils/api";
import { validRegister } from '../../utils/validRegister'


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

export const register = (userRegister) => async (dispatch) => {
  try {
    const check = validRegister(userRegister)
  
    if(check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("register", userRegister);
    dispatch({ type: ALERT, payload: { success: res.data.message } })
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.message } })
  }
}
