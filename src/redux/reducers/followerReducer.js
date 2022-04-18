import { FOLLOWER } from "../types/types";

export const followerReducer = (state = {}, action) => {
    switch (action.type) {
        case FOLLOWER:
            return action.payload;
        default:
            return state;
    }
};