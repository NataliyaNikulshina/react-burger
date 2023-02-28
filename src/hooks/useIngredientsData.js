import {useSelector} from "react-redux";
import {useCallback, useMemo} from "react";

export const useIngredientsData = () => {
    const ingredients = useSelector((state) => state.ingredients);
//console.log(ingredients)
  const ingredientsDataDict = useMemo(() => {
    const ingredientsData = {}
    ingredients.items.forEach(ingredient => ingredientsData[ingredient._id] = ingredient)
    return ingredientsData
  }, [ingredients])

  const getIngredientImage = useCallback(ingredientId => ingredientsDataDict[ingredientId].image,[ingredientsDataDict])
  const getIngredientPrice = useCallback(ingredientId => ingredientsDataDict[ingredientId].price,[ingredientsDataDict])
  const getIngredientData = useCallback(ingredientId => ingredientsDataDict[ingredientId],[ingredientsDataDict])
 
  return useMemo(() => ({ingredientsDataDict,getIngredientPrice,getIngredientImage, getIngredientData}),[ getIngredientImage, getIngredientPrice, getIngredientData, ingredientsDataDict])
}