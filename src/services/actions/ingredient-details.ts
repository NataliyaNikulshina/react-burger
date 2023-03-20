import { IIngredient } from "../types/data";

export const SET_INGREDIENT_DETAILS: 'SET_INGREDIENT_DETAILS' = "SET_INGREDIENT_DETAILS";
export const RESET_INGREDIENT_DETAILS: 'RESET_INGREDIENT_DETAILS' = "RESET_INGREDIENT_DETAILS";

export interface ISetIngredientDetailsAction {
  readonly type: typeof SET_INGREDIENT_DETAILS;
  readonly payload: {
    name: string,
    image_large: string,
    calories: number,
    proteins: number,
    fat: number,
    carbohydrates: number
  };
}
export interface IResetIngredientDetailsAction {
  readonly type: typeof RESET_INGREDIENT_DETAILS;
}

export const resetIngredientDetails = (): IResetIngredientDetailsAction => ({
  type: RESET_INGREDIENT_DETAILS
});

export const setIngredientDetails = (ingredient: IIngredient): ISetIngredientDetailsAction => {
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
