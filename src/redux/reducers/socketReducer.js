import { SOCKET } from "../types/types";

 const socket = (state = {}, action) => {
    switch (action.type) {
        case SOCKET:
            return action.payload;
        default:
            return state;
    }
};


export default socket