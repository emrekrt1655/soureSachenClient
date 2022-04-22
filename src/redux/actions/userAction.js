import { ALERT, USER } from "../types/types";
import { getAPI } from "../../utils/api";

export const getUsers = () => async (dispatch) => {
    try {
        const res = await getAPI('users', null);
        dispatch({ type: USER, payload: res.data })
    } catch (err) {
        dispatch({ type: ALERT, payload: "Service Error" })
    }
}