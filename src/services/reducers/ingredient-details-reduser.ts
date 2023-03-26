import {
    SET_INGREDIENT_DETAILS,
    RESET_INGREDIENT_DETAILS
} from '../actions/ingredient-details';
import { TIngredientDetailsAction } from '../actions/ingredient-details';
import { IIngredient, IIngDetailsInitial } from '../types/data'


export interface IIngDetailsInitialState {
    ingredientDetailsInfo: IIngDetailsInitial | undefined;
  }
export const initialState: IIngDetailsInitialState = {
    ingredientDetailsInfo: undefined
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsAction): IIngDetailsInitialState => {

    switch (action.type) {
        case SET_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetailsInfo: action.payload
            };
        }
        case RESET_INGREDIENT_DETAILS: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}