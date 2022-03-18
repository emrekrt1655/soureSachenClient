import { TOPIC } from "../types/types";

export const topicReducer = (state = {}, action) => {
    switch (action.type) {
        case TOPIC:
            return action.payload;
        default:
            return state;
    }
};