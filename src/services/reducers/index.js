import { ingredientsReducer } from './ingredients-reduser';
import { orderReducer } from './order-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reduser.js';
import { constructorReduser } from './constructor-reduser';
import { userReducer } from './user-reduser';
import { combineReducers } from 'redux';
import { feedWsReducer } from './feed-ws-reduser'
import { userWsReducer } from './user-ws-reduser';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    details: ingredientDetailsReducer,
    constructor : constructorReduser,
    user: userReducer,
    wsocketFeed: feedWsReducer,
    wsocketUser: userWsReducer
  });