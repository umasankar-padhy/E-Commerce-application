import { SET_AUTH } from './authTypes';

export const setAuth = (authData) => {
    return {
        type: SET_AUTH,
        payload: authData,
    };
};
