import {
  ADD_ING_CONSTRUCTOR,
  SORT_ING_CONSTRUCTOR,
  DELETE_ING_CONSTRUCTOR,
  SET_BIN_CONSTRUCTOR,
  RESET_ING_CONSTRUCTOR,
} from "../actions/constructor";
import { TConstructorAction } from '../actions/constructor';
import { IIngredient } from '../types/data';

export interface IConstructorInitialState {
  bun: IIngredient | null,
  ingredients: IIngredient[]
}

export const initialState: IConstructorInitialState = {
  bun: null,
  ingredients: [],
};

export const constructorReduser = (state = initialState, action: TConstructorAction): IConstructorInitialState => {
  switch (action.type) {
    case ADD_ING_CONSTRUCTOR:
      if (!state.ingredients) {
        return {
          ...state,
          ingredients: [
            { ...action.payload, _idInBasket: Date.now().toString() },
          ],
        };
      } else {
        return {
          ...state,
          ingredients: [
            ...state.ingredients,
            { ...action.payload, _idInBasket: Date.now().toString() },
          ],
        };
      }
    case SET_BIN_CONSTRUCTOR:
      return { ...state, bun: action.payload };
    case DELETE_ING_CONSTRUCTOR:
      return {
        ...state,
        ingredients: state.ingredients.filter(
          (ingredient) => ingredient._idInBasket !== action.payload
        ),
      };
    case SORT_ING_CONSTRUCTOR:
      const ingredients = [...state.ingredients];
      ingredients.splice(
        action.payload.to,
        0,
        ingredients.splice(action.payload.from, 1)[0]
      );
      return {
        ...state,
        ingredients,
      };
    case RESET_ING_CONSTRUCTOR: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};
