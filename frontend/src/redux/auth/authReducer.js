import { SET_AUTH } from './authTypes';

const initialState = {};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH:
            return action.payload;
        default:
            return state;
    }
};

export default authReducer;
