import { IIngredient } from "../types/data";

export const ADD_ING_CONSTRUCTOR: 'ADD_ING_CONSTRUCTOR' = "ADD_ING_CONSTRUCTOR";
export const SORT_ING_CONSTRUCTOR: 'SORT_ING_CONSTRUCTOR' = "SORT_ING_CONSTRUCTOR";
export const DELETE_ING_CONSTRUCTOR: 'DELETE_ING_CONSTRUCTOR' = "DELETE_ING_CONSTRUCTOR";
export const SET_BIN_CONSTRUCTOR: 'SET_BIN_CONSTRUCTOR' = "SET_BIN_CONSTRUCTOR";
export const RESET_ING_CONSTRUCTOR: 'RESET_ING_CONSTRUCTOR' = "RESET_ING_CONSTRUCTOR";

export interface IAddIngredientConstructorAction {
  readonly type: typeof ADD_ING_CONSTRUCTOR;
  readonly payload: IIngredient;
}
export interface ISortIngredientConstructorAction {
  readonly type: typeof SORT_ING_CONSTRUCTOR;
  readonly payload: {from: number, to: number}
}
export interface IDeleteIngredientConstructorAction {
  readonly type: typeof DELETE_ING_CONSTRUCTOR;
  readonly payload: string | undefined;
}
export interface IResetIngredientConstructorAction {
  readonly type: typeof RESET_ING_CONSTRUCTOR;
}
export interface ISetBinConstructorAction {
  readonly type: typeof SET_BIN_CONSTRUCTOR;
  readonly payload: IIngredient;
}

export type TConstructorAction =  IAddIngredientConstructorAction | ISortIngredientConstructorAction | IDeleteIngredientConstructorAction |
  IResetIngredientConstructorAction | ISetBinConstructorAction;

export const addIngConstructor = (ingredient: IIngredient): IAddIngredientConstructorAction => ({type: ADD_ING_CONSTRUCTOR, payload: ingredient})
export const deleteIngConstructor = (ingId: string | undefined): IDeleteIngredientConstructorAction => ({type: DELETE_ING_CONSTRUCTOR, payload: ingId})
export const setBunConstructor = (bun: IIngredient): ISetBinConstructorAction => ({type: SET_BIN_CONSTRUCTOR, payload: bun})
export const sortIngConstructor = (dragIndex: number, hoverIndex: number): ISortIngredientConstructorAction => ({type: SORT_ING_CONSTRUCTOR, payload: {
    from: dragIndex,
    to: hoverIndex,
  }})
export const resetIngConstructor = ():IResetIngredientConstructorAction => ({type: RESET_ING_CONSTRUCTOR})

