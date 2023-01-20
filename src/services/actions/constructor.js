export const ADD_ING_CONSTRUCTOR = "ADD_ING_CONSTRUCTOR";
export const SORT_ING_CONSTRUCTOR = "SORT_ING_CONSTRUCTOR";
export const DELETE_ING_CONSTRUCTOR = "DELETE_ING_CONSTRUCTOR";
export const SET_BIN_CONSTRUCTOR = "SET_BIN_CONSTRUCTOR";
export const RESET_ING_CONSTRUCTOR = "RESET_ING_CONSTRUCTOR";

export const addIngConstructor = (ingredient) => ({type: ADD_ING_CONSTRUCTOR, payload: ingredient})
export const deleteIngConstructor = (ingId) => ({type: DELETE_ING_CONSTRUCTOR, payload: ingId})
export const setBunConstructor = (bun) => ({type: SET_BIN_CONSTRUCTOR, payload: bun})
export const sortIngConstructor = (dragIndex, hoverIndex) => ({type: SORT_ING_CONSTRUCTOR, payload: {
    from: dragIndex,
    to: hoverIndex,
  }})
export const resetIngConstructor = () => ({type: RESET_ING_CONSTRUCTOR})

