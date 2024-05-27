import { SET_CART} from './cartTypes';

export const setCart = (cardData) => {
    return {
        type: SET_CART,
        payload: cardData,
    };
};
