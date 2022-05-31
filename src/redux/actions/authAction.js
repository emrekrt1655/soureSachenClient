import { AUTH, ALERT } from "../types/types";
import { postAPI, getAPI, putAPI, deleteAPI } from "../../utils/api";
import { validRegister, validUpdate, validChangePassword, checkPassword } from '../../utils/validRegister'
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
    const check = validUpdate(userUpdate)
    const accessToken = access_token
    if (check?.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await putAPI(`useredit/${id}`, userUpdate, accessToken);
    dispatch({ type: ALERT, payload: { success: res?.data.message } })
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.message } })
  }
}

export const changeOldPassword = (changePassword, id, access_token) => async (dispatch) => {
  try {
    const check = validChangePassword(changePassword)
    const accessToken = access_token
    if (check?.errLength > 0)
      return dispatch({ type: ALERT, payload: { errors: check.errMsg } })

    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await putAPI(`changePassword/${id}`, changePassword, accessToken);
    dispatch({ type: ALERT, payload: { success: res?.data.message } })
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err.response.data.message } })
  }

}

export const deleteAcccount = (id, access_token) => async (dispatch) => {
  try {
    const accessToken = access_token
    dispatch({ type: ALERT, payload: { loading: true } });
    const res = await deleteAPI(`userdelete/${id}`, accessToken);
    dispatch({ type: ALERT, payload: { success: res?.data.message } })
  } catch (err) {
    dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } })
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
      dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
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
      dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } });
    }
  };

export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: ALERT, payload: { loading: true } })
    const res = await postAPI("forgot_password", { email })
    dispatch({ type: ALERT, payload: { success: res?.data.message } })
  }
  catch (err) {
    dispatch({ type: ALERT, payload: { errors: err?.response?.data.message } })
  }
}

export const resetPassword = (password, cf_password, token) => async (dispatch) => {
  const result = await checkTokenExpire(token, dispatch);
  const access_token = result ? result : token


  const message = checkPassword(password, cf_password)
  if (message) return dispatch({ type: ALERT, payload: { errors: message } })

  try {
    dispatch({ type: ALERT, payload: { loading: true } })

    const res = await putAPI('reset_password', { password }, access_token)

    dispatch({ type: ALERT, payload: { success: res.data.message } })

  } catch (error) {
    dispatch({ type: ALERT, payload: { errors: error.response.data.message } })
  }

}
