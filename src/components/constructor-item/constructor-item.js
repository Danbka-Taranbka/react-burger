import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDrag, useDrop } from "react-dnd";
import styles from "./constructor-item.module.css";
import { useDispatch } from "react-redux";
import {  SORT_DRAGGING_ITEM, removeIngredientAction} from "../../services/actions";
import { useRef } from "react";
import { ingredientPropTypes } from '../../utils/config';
import PropTypes from 'prop-types';

export const ConstructorItem = ({ingredient, type, index}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const id = ingredient._id;
  const removeIngredient = (uniqueId, itemId) => {
    dispatch(removeIngredientAction(itemId, uniqueId));
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
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
      dispatch({
        type: SORT_DRAGGING_ITEM,
        dragIndex,
        hoverIndex,
      });
      item.index = hoverIndex;
    },
  });

  const [, drag] = useDrag({
    type: type,
    item: () => {
      return { id, index };
    },
  });

  drag(drop(ref));

  return(
    <li ref={ref} key={ingredient.uniqueId} className={styles.listItem}>
      <DragIcon type="primary" />
      <ConstructorElement
      index={index}
        key={ingredient._id}
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          removeIngredient(ingredient.uniqueId, ingredient._id);
        }}
      />
    </li>
  )
}

ConstructorItem.propTypes = {
  ingredient: ingredientPropTypes.isRequired,
  type: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
}