import { useRef } from "react";
import burgerItem from "./burger-item.module.css";
import {
  ConstructorElement,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import ingredientType from "../../utils/types.js";
import { useDispatch } from "react-redux";
import { useDrop, useDrag } from "react-dnd";
import {
  sortIngConstructor,
  deleteIngConstructor,
} from "../../services/actions/constructor";

export const BurgerFirstItem = ({ ingredient }) => {
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

BurgerFirstItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

export const BurgerMiddleItem = ({ ingredient, index }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [{ handlerId }, drop] = useDrop({
    accept: "sort_ingredient",
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },

    hover(ingredient, monitor) {
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
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

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
  const [{ isDragging }, drag] = useDrag({
    type: "sort_ingredient",
    item: () => ({ ingredient, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  if (ingredient.type !== "bun") drag(drop(ref));
  const preventDefault = (e) => e.preventDefault();

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
          type=""
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

BurgerMiddleItem.propTypes = {
  ingredient: ingredientType.isRequired,
};

export const BurgerLastItem = ({ ingredient }) => {
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

BurgerLastItem.propTypes = {
  ingredient: ingredientType.isRequired,
};
