import {
  UPDATE_TOTAL_PRICE,
  SORT_DRAGGING_ITEM,
} from "../actions/index.js";

import {
  CLEAR_CONSTRUCTOR,
  RESET_COUNTERS,
} from "../actions/order.tsx"

import {
  GET_INGREDIENT_REQUEST,
  GET_INGREDIENT_SUCCESS,
  GET_INGREDIENT_FAILED,

} from '../actions/ingredients.js';

import {
  SET_BUN,
  ADD_CONSTRUCTOR_ITEM,
  DELETE_CONSTRUCTOR_ITEM,
  UPDATE_INGREDIENT_COUNTER,
  UPDATE_BUN_COUNTER,
} from "../actions/constructor.js"

const initialState = {
  data: [],
  dataRequest: false,
  dataFailed: false,

  chosenBun: {},
  constructorIngredients: [],

  currentIngredient: {},

  totalPrice: 0,
};

export const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_INGREDIENT_REQUEST: {
      return {
        ...state,
        dataRequest: true,
      };
    }
    case GET_INGREDIENT_SUCCESS: {
      return {
        ...state,
        dataRequest: false,
        dataFailed: false,
        data: action.data.map((item) => {
          return { ...item, counter: 0 };
        }),
      };
    }
    case GET_INGREDIENT_FAILED: {
      return { ...state, dataFailed: true, dataRequest: false };
    }

    case SET_BUN: {
      return {
        ...state,
        chosenBun: state.data.find((item) => item._id === action.itemId),
      };
    }
    case UPDATE_TOTAL_PRICE: {
      const bunPrice = (
        state.chosenBun.price === undefined
        ? 0
        : state.chosenBun.price * 2
      )
      const totalPrice = state.constructorIngredients.reduce((acc, currentItem) => acc + currentItem.price, bunPrice)
      return {
        ...state,
        totalPrice: totalPrice,
      };
    }
    case ADD_CONSTRUCTOR_ITEM: {
      const newItem = state.data.find((item) => item._id === action.ingredientId);
      const uniqueId = action.uuid;
      const ingred = { ...newItem, uniqueId };

      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients, ingred],
      };
    }
    case UPDATE_INGREDIENT_COUNTER: {
      return {
        ...state,
        data: state.data.map((ingredient) => {
          if (ingredient._id === action.ingredientId) {
            const counter = state.constructorIngredients.filter((item) => {
              return item._id === action.ingredientId;
            }).length;
            return { ...ingredient, counter: counter };
          }
          return ingredient;
        }),
      };
    }
    case UPDATE_BUN_COUNTER: {
      return {
        ...state,
        data: state.data.map((ingredient) => {
          if (ingredient.type === "bun") {
            return ingredient._id === action.itemId
              ? { ...ingredient, counter: 1 }
              : { ...ingredient, counter: 0 };
          }
          return ingredient;
        }),
      };
    }
    case DELETE_CONSTRUCTOR_ITEM: {
      return {
        ...state,
        constructorIngredients: [...state.constructorIngredients].filter(
          (item) => item.uniqueId !== action.uniqueId
        ),
      };
    }
    case SORT_DRAGGING_ITEM: {
      const newConstructorList = state.constructorIngredients.map(
        (item) => item
      );

      newConstructorList[action.hoverIndex] = newConstructorList.splice(
        action.dragIndex,
        1,
        newConstructorList[action.hoverIndex]
      )[0];

      return {
        ...state,
        constructorIngredients: newConstructorList,
      };
    }
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        chosenBun: {},
        constructorIngredients: [],
      };
    }
    case RESET_COUNTERS: {
      return {
        ...state,
        data: state.data.map((item) => {
          return { ...item, counter: 0 };
        }),
      };
    }
    default:
      return state;
  }
};