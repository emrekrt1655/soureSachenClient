import { POST } from "../types/types";

export const postReducer = (state = {}, action) => {
    switch (action.type) {
        case POST:
            return action.payload;
        default:
            return state;
    }
};

