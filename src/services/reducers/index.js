import { ingredientsReducer } from './ingredients-reduser';
import { orderReducer } from './order-reducer';
import { ingredientDetailsReducer } from './ingredient-details-reduser.js';
import { constructorReduser } from './constructor-reduser';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
    ingredients: ingredientsReducer,
    order: orderReducer,
    details: ingredientDetailsReducer,
    constructor : constructorReduser
  });