import { TOrder, TIngredient, TToken } from "../services/types/data";

export type TUpdatedOrder = Omit<TOrder, "ingredients"> & {ingredients: TIngredient[]; totalPrice: number}

export function handleTokens(data: TToken) {
  localStorage.setItem("refreshToken", data.refreshToken);
  let authToken;
  if (data.accessToken.indexOf("Bearer") === 0) {
    authToken = data.accessToken.split("Bearer ")[1];
  }
  if (authToken) {
    setCookie("token", authToken);
  }
}

export function getCookie(name: string) {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string | null,
  props?: Record<string, string | Date | boolean | number> | undefined
) {
  if (props) {
    let exp = props.expires;
    if (typeof exp == "number" && exp) {
      const d = new Date();
      d.setTime(d.getTime() + exp * 1000);
      exp = props.expires = d;
    }

    if (exp instanceof Date) {
      props.expires = exp.toUTCString();
    }
  }

  if (value) {
    value = encodeURIComponent(value);
  }
  let updatedCookie = name + "=" + value;

  for (const propName in props) {
    updatedCookie += "; " + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, null, { expires: -1 });
}

export const parseOrderIngredients = (data: TIngredient[], order: TOrder): TUpdatedOrder => {
  let updatedOrder: TUpdatedOrder;
  const orderedIngredients = order.ingredients.reduce((prevVal: TIngredient[], item) => {
    let ingredient = data.find((ingredient) => ingredient._id === item);
    if (ingredient) {
      const isIngredientRepeated = prevVal.findIndex(
      (element) => element._id === ingredient?._id
    );
    if (isIngredientRepeated >= 0) {
      prevVal[isIngredientRepeated].counter++;
    } else {
      ingredient.counter = 1;
      prevVal = [...prevVal, ingredient];
    }}

    return prevVal;
  }, []);


  const totalPrice = orderedIngredients.reduce((prevVal: number, item: TIngredient) => {
    return (prevVal = prevVal + item.price * item.counter);
  }, 0);
  
  updatedOrder = {
    ...order,
    ingredients: orderedIngredients,
    totalPrice: totalPrice,
  };

  return updatedOrder;
}