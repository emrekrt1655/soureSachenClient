import { AUTH, ALERT } from "../types/types";
import { postAPI, getAPI, putAPI, deleteAPI } from "../../utils/api";
import { validRegister } from '../../utils/validRegister'
import { checkTokenExpire } from '../../utils/checkTokenExpire'

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
    //localStorage.setItem("logged", res.data.access_token)
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
  }
};

export const register = (userRegister, access_token) => async (dispatch) => {
  try {
    const accessToken = access_token
    const check = validRegister(userRegister)

    if (check.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await postAPI("register", userRegister, accessToken);
    dispatch({ type: ALERT, payload: { success: res.data.message } })
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.message } })
  }
}

export const update = (userUpdate, id, access_token) => async (dispatch) => {
  try {
    const check = validRegister(userUpdate)
    const accessToken = access_token
    console.log('accessToken', accessToken)
    if (check?.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await putAPI(`useredit/${id}`, userUpdate, accessToken);
    dispatch({ type: ALERT, payload: { success: res.data.message } })
  } catch (err) {
    dispatch({ type: ALERT, payload: err?.response.data.message })
  }
}

export const deleteAcccount = (id, access_token) => async (dispatch) => {
  try {
    const accessToken = access_token
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await deleteAPI(`userdelete/${id}`, accessToken);
    dispatch({ type: ALERT, payload: { success: res.data.message } })
  } catch (err) {
    dispatch({ type: ALERT, payload: err?.response.data.message })
  }
}

export const refreshToken =
  () => async (dispatch) => {
    const refresh = localStorage.getItem("refresh");
    if (refresh !== "soureSachen") return;
    try {
      //const accessToken = access_token
      dispatch({ type: ALERT, payload: { loading: true } });
      const res = await getAPI("refresh_token");
      dispatch({
        type: AUTH, payload:
          res.data
      });
      //localStorage.setItem("logged", res.data.access_token);
      dispatch({ type: ALERT, payload: {} })
    } catch (err) {
      dispatch({ type: ALERT, payload: "Something happened!" });
    }
  };

export const logOut =
  (token) => async (dispatch) => {
    const result = await checkTokenExpire(token, dispatch)
    const access_token = result ? result : token
    try {
      //localStorage.removeItem("logged");
      localStorage.removeItem("refresh")
      await getAPI("/logout", access_token);
      window.location.href = "/";
    } catch (err) {
      dispatch({ type: ALERT, payload: err.response.data.message });
    }
  };
