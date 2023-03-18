import { IIngredient } from "../types/data";

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = "SET_INGREDIENT_DETAILS";
export const RESET_INGREDIENT_DETAILS: 'RESET_INGREDIENT_DETAILS' = "RESET_INGREDIENT_DETAILS";

export interface ISetIngredientDetailsAction {
  readonly type: typeof SET_INGREDIENT_DETAILS;
  readonly payload: IIngredient;
}
export interface IResetIngredientDetailsAction {
  readonly type: typeof RESET_INGREDIENT_DETAILS;
}

export const addIngredientDetails = (ingredient: IIngredient) => {
  return {
    type: SET_INGREDIENT_DETAILS,
    payload: {
      name: ingredient.name,
      image_large: ingredient.image_large,
      calories: ingredient.calories,
      proteins: ingredient.proteins,
      fat: ingredient.fat,
      carbohydrates: ingredient.carbohydrates,
    },
  };
};
