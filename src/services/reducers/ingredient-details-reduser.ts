import {
    SET_INGREDIENT_DETAILS,
    RESET_INGREDIENT_DETAILS
} from '../actions/ingredient-details';
import { TIngredientDetailsAction } from '../actions/ingredient-details';
import { IIngDetailsInitial } from '../types/data'

type TIngDetailsInitialUnderfined = IIngDetailsInitial | undefined;

export interface IIngDetailsInitialState {
    ingredientDetails: TIngDetailsInitialUnderfined;
  }
export const initialState: IIngDetailsInitialState = {
    ingredientDetails: undefined
}

export const ingredientDetailsReducer = (state = initialState, action: TIngredientDetailsAction): IIngDetailsInitialState => {

    switch (action.type) {
        case SET_INGREDIENT_DETAILS: {
            return {
                ...state,
                ingredientDetails: action.payload
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