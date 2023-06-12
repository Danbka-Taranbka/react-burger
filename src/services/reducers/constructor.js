import {SET_BUN, ADD_CONSTRUCTOR_ITEM,} from '../actions/constructor.js';

const initialState = {
  chosenBun: {},
  constructorIngredients: [],
}

export const constructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BUN: {
      return {
        ...state,
        chosenBun: action.itemId,
      };
    }
    case ADD_CONSTRUCTOR_ITEM: {
      const newItem = action.ingredientId;
      const uniqueId = action.uuid;
      const ingred = { ...newItem, uniqueId };

      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, ingred],
      };
    }
    default: 
    return state;
  }
}