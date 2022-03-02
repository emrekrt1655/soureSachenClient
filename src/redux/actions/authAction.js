import { AUTH, ALERT } from "../types/types";
import { postAPI, getAPI } from "../../utils/api";
import { validRegister } from '../../utils/validRegister'


export const login = (userLogin) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("login", userLogin);
    dispatch({
      type: AUTH,
      payload: res.data
    });
    dispatch({ type: ALERT, payload: { success: res.data.message } });
    localStorage.setItem("refresh", "soureSachen");
    localStorage.setItem("logged", res.data.access_token)
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
  }
};

export const register = (userRegister) => async (dispatch) => {
  try {
    const check = validRegister(userRegister)

    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("register", userRegister);
    dispatch({ type: ALERT, payload: { success: res.data.message } })
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.message } })
  }
}

export const refreshToken =
  () => async (dispatch) => {
    const refresh = localStorage.getItem("refresh");
    if (refresh !== "soureSachen") return;
    try {
      dispatch({ type: ALERT, payload: { loading: false } });
      const res = await getAPI("refresh_token");
      dispatch({
        type: AUTH, payload:
          res.data
      });
      localStorage.setItem("logged", res.data.access_token);
    } catch (err) {
      dispatch({ type: ALERT, payload: err?.response.data.message });
    }
  };

export const logOut =
  () => async (dispatch) => {
    try {
      localStorage.removeItem("logged");
      localStorage.removeItem("refresh")
      getAPI("/logout");
      window.location.href = "/";
    } catch (err) {
      dispatch({ type: ALERT, payload: err.response.data.message });
    }
  };
