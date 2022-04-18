import { COMMENT } from "../types/types";

export const commentReducer = (state = {}, action) => {
    switch (action.type) {
        case COMMENT:
            return action.payload;
        default:
            return state;
    }
};
