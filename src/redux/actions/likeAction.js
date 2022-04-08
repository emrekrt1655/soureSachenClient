import { ALERT, LIKE } from "../types/types";
import { getAPI, postAPI } from "../../utils/api";

export const getLikes = () => async (dispatch) => {

    try {
        dispatch({ type: ALERT, payload: { loading: false } })
        const res = await getAPI(`likes`);
        dispatch({ type: LIKE, payload: res.data })
    } catch (err) {
        dispatch({ type: ALERT, payload: err?.response.data.message })
    }
}