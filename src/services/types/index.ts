import { Action, ActionCreator } from "redux";
import { store } from "../../"
import { ThunkAction } from "redux-thunk";
import { TIngredientsActions } from "../actions/ingredients";
import { TConstructorActions } from "../actions/constructor";
import { TWsFeedActions, TWsUserActions } from "../actions/ws";
import { TPopupActions } from "../actions/ingredientPopup";
import { TOrderActions } from "../actions/order";
import { TUserActions } from "../actions/user";

type TAppActions = 
| TIngredientsActions
| TConstructorActions
| TWsUserActions
| TWsFeedActions
| TPopupActions
| TOrderActions
| TUserActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ActionCreator<
  ThunkAction<ReturnType, Action, RootState, TAppActions>
>;