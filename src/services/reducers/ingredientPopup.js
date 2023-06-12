import {
  TOGGLE_INGREDIENT_MODAL,
  SET_INGREDIENT,
  CLEAR_INGREDIENT,
} from "../actions/ingredientPopup.js";

const initialState = {
  currentIngredient: {},
  ingredientModal : false
}

export const ingredientPopupReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_INGREDIENT: {
      return { ...state, currentIngredient: action.payload };
    }
    case CLEAR_INGREDIENT: {
      return { ...state, currentIngredient: {} };
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