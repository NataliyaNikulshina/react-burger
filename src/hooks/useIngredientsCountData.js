import {useCallback, useMemo} from "react";
import {useSelector} from "react-redux";

export const useIngredientsCountData = (arrayToCalculateCount) => {
    const ingredients = useSelector((state) => state.ingredients);
    console.log(ingredients)

    const ingredientsCountData = useMemo(() => {
        const ingredientsCount = {}
        ingredients.items.forEach((ingredient) => ingredientsCount[ingredient._id] = arrayToCalculateCount.filter(arrayItem => arrayItem._id === ingredient._id).length)
        return ingredientsCount
    }, [ingredients, arrayToCalculateCount])

    const getIngredientCount = useCallback ((ingredientId) => ingredientsCountData[ingredientId],[ingredientsCountData])

    return useMemo(() => ({ingredientsCountData,getIngredientCount}),[getIngredientCount, ingredientsCountData])
}