import {combineReducers} from 'redux';
import { ingredientsReducer } from './ingredients.js';
import { orderReducer } from './order.js';
import { ingredientPopupReducer } from './ingredientPopup.js';
import { userReducer } from './user.js';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredientPopup: ingredientPopupReducer,
  user: userReducer
});