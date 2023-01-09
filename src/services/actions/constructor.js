export const ADD_CONSTRUCTOR = "ADD_CONSTRUCTOR";
export const DELETE_CONSTRUCTOR = "DELETE_CONSTRUCTOR";
export const REORDER_CONSTRUCTOR = "REORDER_CONSTRUCTOR";
export const RESET_CONSTRUCTOR = "RESET_CONSTRUCTOR";

export const addConstructor = (ingredient) => {
  return {
    type: ADD_CONSTRUCTOR,
    payload: {
      image: ingredient.image,
      name: ingredient.name,
      price: ingredient.price,
      type: ingredient.type,
      id: ingredient["_id"],
      key: 0,
    },
  };
};
