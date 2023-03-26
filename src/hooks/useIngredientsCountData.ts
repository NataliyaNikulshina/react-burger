import {useCallback, useMemo} from "react";
import {useSelector} from "../services/hooks";
import { IIngredient } from "../services/types/data";

interface IIngredientsCount {
    [ingredientsCount: string]: number;
  }

export const useIngredientsCountData = (arrayToCalculateCount: IIngredient[]) => {
    const ingredients = useSelector((state) => state.ingredients);

    const ingredientsCountData = useMemo<IIngredientsCount>(() => {
        const ingredientsCount: IIngredientsCount = {}
        ingredients.items.forEach((ingredient) => ingredientsCount[ingredient._id] = arrayToCalculateCount.filter(arrayItem => arrayItem._id === ingredient._id).length)
        return ingredientsCount
    }, [ingredients, arrayToCalculateCount])

    const getIngredientCount = useCallback ((ingredientId: string) => ingredientsCountData[ingredientId],[ingredientsCountData])

    return useMemo(() => ({ingredientsCountData,getIngredientCount}),[getIngredientCount, ingredientsCountData])
}