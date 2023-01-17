import {
    ADD_ING_CONSTRUCTOR, 
    SET_ING_CONSTRUCTOR,
    DELETE_ING_CONSTRUCTOR,
    SET_BIN_CONSTRUCTOR,
    RESET_ING_CONSTRUCTOR
    
} from "../actions/constructor";

export const initialState = {
    bun: null,
    ingredients: []
}

export const constructorReduser = (state = initialState, action) => {
    switch (action.type) {
        case SET_ING_CONSTRUCTOR:
            return {...state, ingredients: action.payload}
        case ADD_ING_CONSTRUCTOR:
            if (!state.ingredients){
                return {...state, ingredients: [{...action.payload, _id:Date.now().toString()}]}
            } else {
                return {...state, ingredients: [...state.ingredients, {...action.payload, _id:Date.now().toString()}]}
            }
        case SET_BIN_CONSTRUCTOR: 
            return {...state, bun: action.payload}
        case DELETE_ING_CONSTRUCTOR: 
            return {...state, ingredients: state.ingredients.filter(ingredient => ingredient._id !== action.payload)}
        case RESET_ING_CONSTRUCTOR: {
            return initialState;
        }
        default: {
            return state;
        }
    }
}