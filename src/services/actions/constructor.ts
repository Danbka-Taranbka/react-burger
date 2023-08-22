import { AppDispatch, AppThunk } from "../types";
import { v4 as uuidv4 } from "uuid";

export const ADD_CONSTRUCTOR_ITEM: "ADD_CONSTRUCTOR_ITEM" = "ADD_CONSTRUCTOR_ITEM";
export const UPDATE_INGREDIENT_COUNTER: "UPDATE_INGREDIENT_COUNTER" = "UPDATE_INGREDIENT_COUNTER";
export const DELETE_CONSTRUCTOR_ITEM: "DELETE_CONSTRUCTOR_ITEM" = "DELETE_CONSTRUCTOR_ITEM";
export const SET_BUN: "SET_BUN" = "SET_BUN";
export const UPDATE_BUN_COUNTER: "UPDATE_BUN_COUNTER" = "UPDATE_BUN_COUNTER";

export const UPDATE_TOTAL_PRICE: "UPDATE_TOTAL_PRICE" = "UPDATE_TOTAL_PRICE";
export const SORT_DRAGGING_ITEM: "SORT_DRAGGING_ITEM" = "SORT_DRAGGING_ITEM";

type TUpdateTotalPriceAction = {
  readonly type: typeof UPDATE_TOTAL_PRICE;
}

type TSortDraggingItemAction = {
  readonly type: typeof SORT_DRAGGING_ITEM;
  readonly dragIndex: number;
  readonly hoverIndex: number;
}

type TAddConstructorItemAction = {
  readonly type: typeof ADD_CONSTRUCTOR_ITEM;
  readonly ingredientId: string;
  readonly uuid: string;
};

type TUpdateIngredientCounterAction = {
  readonly type: typeof UPDATE_INGREDIENT_COUNTER;
  readonly ingredientId: string;
};

type TRemoveConstructorItemAction = {
  readonly type: typeof DELETE_CONSTRUCTOR_ITEM;
  readonly uniqueId: string;
};

type TSetBunItemAction = {
  readonly type: typeof SET_BUN;
  readonly itemId: string;
};

type TUpdateBunCounterAction = {
  readonly type: typeof UPDATE_BUN_COUNTER;
  readonly itemId: string;
};

export type TConstructorActions = 
| TAddConstructorItemAction
| TUpdateIngredientCounterAction
| TRemoveConstructorItemAction
| TSortDraggingItemAction
| TSetBunItemAction
| TUpdateBunCounterAction
| TUpdateTotalPriceAction;

export const addConstructorItemAction = (ingredientId: string, uuid: string): TAddConstructorItemAction => ({
  type: ADD_CONSTRUCTOR_ITEM, 
  ingredientId, 
  uuid
})

export const updateIngredientCounterAction = (ingredientId: string): TUpdateIngredientCounterAction => ({
  type: UPDATE_INGREDIENT_COUNTER, 
  ingredientId
})

export const removeConstructorItemAction = (uniqueId: string): TRemoveConstructorItemAction => ({
  type: DELETE_CONSTRUCTOR_ITEM, 
  uniqueId
})

export const setBunItemAction = (itemId: string): TSetBunItemAction => ({
  type: SET_BUN, 
  itemId 
})

export const updateBunCounterAction = (itemId: string): TUpdateBunCounterAction => ({
  type: UPDATE_BUN_COUNTER, 
  itemId 
})

export const updateTotalPriceAction = (): TUpdateTotalPriceAction => ({
  type: UPDATE_TOTAL_PRICE,
});

export const sortDraggingItemAction = (
  dragIndex: number,
  hoverIndex: number
): TSortDraggingItemAction => ({
  type: SORT_DRAGGING_ITEM,
  dragIndex,
  hoverIndex,
});

export const addItemThunk: AppThunk = (itemId: string) => {
  return function (dispatch: AppDispatch) {
    const uuid: string = uuidv4();
    dispatch(addConstructorItemAction(itemId, uuid));
    dispatch(updateIngredientCounterAction(itemId));
  };
};

export const removeItemThunk: AppThunk = (
  itemId: string,
  uniqueId: string
) => {
  return function (dispatch: AppDispatch) {
    dispatch(removeConstructorItemAction(uniqueId));
    dispatch(updateIngredientCounterAction(itemId));
  };
};

export const setBunActionThunk: AppThunk = (itemId: string) => {
  return function (dispatch: AppDispatch) {
    dispatch(setBunItemAction(itemId));
    dispatch(updateBunCounterAction(itemId));
  };
};