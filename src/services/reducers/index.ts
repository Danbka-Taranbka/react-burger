import {combineReducers} from 'redux';
import { ingredientsReducer } from './ingredients';
import { orderReducer } from './order';
import { ingredientPopupReducer } from './ingredientPopup';
import { userReducer } from './user';
import { wsFeedReducer } from './wsFeed';
import { wsUserReducer } from './wsUser';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  order: orderReducer,
  ingredientPopup: ingredientPopupReducer,
  user: userReducer,
  wsFeed: wsFeedReducer,
  wsUser: wsUserReducer,
});