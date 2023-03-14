import { useRef, FC, ReactNode } from "react";
import burgerItem from "./burger-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types.js";
import { useDispatch } from "react-redux";
import { useDrop, useDrag, XYCoord } from "react-dnd";
import {
  sortIngConstructor,
  deleteIngConstructor,
} from "../../services/actions/constructor";
import { IIngredient } from "../../services/types/data.js";

interface IIngredientProps {
  type: "top" | "bottom" | undefined;
  ingredient: IIngredient;
  index: number;
}

export const BurgerFirstItem: FC<IIngredientProps> = ({ ingredient }) => {
  return (
    <ConstructorElement
      type="top"
      isLocked={true}
      text={`${ingredient.name} (верх)`}
      price={ingredient.price}
      thumbnail={ingredient.image}
    />
  );
};

// BurgerFirstItem.propTypes = {
//   ingredient: ingredientType.isRequired,
// };

export const BurgerMiddleItem: FC<IIngredientProps> = ({ ingredient, index }) => {
//  console.log(ingredient, index)
  const dispatch = useDispatch();
  const ref = useRef<HTMLLIElement>(null);

  
  const [{ isDragging }, drag] = useDrag({
    type: "sort_ingredient",
    item: () => ({ ingredient, index}),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [{ handlerId }, drop] = useDrop({
    accept: "sort_ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(ingredient: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = ingredient.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset: XYCoord | null = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      dispatch(sortIngConstructor(dragIndex, hoverIndex));

      ingredient.index = hoverIndex;
    },
  });

  const opacity = isDragging ? 0 : 1;
  if (ingredient.type !== "bun") drag(drop(ref));
  const preventDefault = (e: React.FormEvent<HTMLLIElement> ) => e.preventDefault();

  return (
    <li
      ref={ref}
      data-handler-id={handlerId}
      style={{ opacity }}
      onDrop={preventDefault}
      className={`${burgerItem.item} mr-2 mb-4 ml-4`}
    >
      <DragIcon type="primary" />
      <div className={`${burgerItem.element}`}>
        <ConstructorElement
          type={undefined}
          text={`${ingredient.name}`}
          price={ingredient.price}
          thumbnail={ingredient.image}
          handleClose={() =>
            dispatch(deleteIngConstructor(ingredient._idInBasket))
          }
        />
      </div>
    </li>
  );
};

// BurgerMiddleItem.propTypes = {
//   ingredient: ingredientType.isRequired,
// };

export const BurgerLastItem: FC<IIngredientProps> = ({ ingredient }) => {
  return (
    <ConstructorElement
      type="bottom"
      isLocked={true}
      text={`${ingredient.name} (низ)`}
      price={ingredient.price}
      thumbnail={ingredient.image}
    />
  );
};

// BurgerLastItem.propTypes = {
//   ingredient: ingredientType.isRequired,
// };
