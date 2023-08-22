import {
  TOGGLE_INGREDIENT_MODAL,
  SET_INGREDIENT,
  CLEAR_INGREDIENT,
  TPopupActions,
} from "../actions/ingredientPopup";
import { TIngredient } from "../types/data";

type TInitialState = {
  currentIngredient: TIngredient | null | undefined;
  ingredientModal: boolean;
};

const initialState: TInitialState = {
  currentIngredient: null,
  ingredientModal : false
}

export const ingredientPopupReducer = (state = initialState, action: TPopupActions): TInitialState => {
  switch (action.type) {
    case SET_INGREDIENT: {
      return { ...state, currentIngredient: action.payload };
    }
    case CLEAR_INGREDIENT: {
      return { ...state, currentIngredient: undefined };
    }
    case TOGGLE_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModal: !state.ingredientModal,
      };
    }
    default: return state;
  } 
}