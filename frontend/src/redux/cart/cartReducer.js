import { SET_CART } from './cartTypes';

const initialState = [];

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CART:
            return action.payload;
        default:
            return state;
    }
};

export default cartReducer;
