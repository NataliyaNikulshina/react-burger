import {
  ADD_CONSTRUCTOR,
  DELETE_CONSTRUCTOR,
  REORDER_CONSTRUCTOR,
  RESET_CONSTRUCTOR,
} from "../actions/constructor";

export const initialState = {
    bun: null,
    ingredients: []
}

export const constructorReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CONSTRUCTOR: {
            if (action.payload.type === 'bun') {
                return { ...state, bun: action.payload };
            } 
                return {
                    ...state,
                    ingredients: [...state.ingredients, action.payload],
                };
        }
        case DELETE_CONSTRUCTOR: {
            return {
            }
        }
        case REORDER_CONSTRUCTOR: {
                return {
            }        
        }
        case RESET_CONSTRUCTOR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}