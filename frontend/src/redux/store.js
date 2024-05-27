
import { createStore, combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import cartReducer from './cart/cartReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
});

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
