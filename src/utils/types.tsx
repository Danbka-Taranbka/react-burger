export type TIngredient = {
  readonly calories: number;
  readonly carbohydrates: number;
  counter: number;
  readonly fat: number;
  readonly image: string;
  readonly image_large: string;
  readonly image_mobile: string;
  readonly name: string;
  readonly price: number;
  readonly proteins: number;
  readonly type: string;
  __v?: number;
  readonly _id: string;
  readonly uniqueId?: string;
};

export type TBun = Omit<TIngredient, "type"> & {readonly type: "bun"};

export type TMain = Omit<TIngredient, "type"> & {readonly type: "main"};

export type TSauce = Omit<TIngredient, "type"> & {readonly type: "sauce"};

export type TItemId = {
  readonly _id: string;
  readonly type: "ingredient" & "bun";
  readonly index: number;
};

export type TConstructorItem = {
  ingredient: TIngredient;
  type: string;
  index: number;
};

export type TForm = {
  title?: string;
  name: string;
} & React.FormHTMLAttributes<HTMLFormElement>;

export type TIngredientIcon = {
  ingredient: TIngredient;
  amount: number;
  index: number;
  location?: string;
};

export type TIngredientsCategory = {
  title: string;
  type: string;
  openIngredient: Function;
  dragType: string;
};

export type TModal = {
  onClose: Function;
  children?: React.ReactNode | undefined;
};

export type TModalOverlay = {
  children?: React.ReactNode | undefined;
};

export type TOrder = {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "done" | "pending";
  updatedAt: string;
  _id: string;
};
