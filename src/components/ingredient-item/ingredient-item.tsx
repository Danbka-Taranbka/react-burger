import styles from './ingredient-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';
import { Link } from 'react-router-dom';
import { FC } from "react";
import { TIngredient } from '../../utils/types';

export type TIngredientItem = {
  ingredient: TIngredient;
  openIngredient: Function;
  type: string;
}; 

export const IngredientItem: FC<TIngredientItem> = ({ingredient, openIngredient, type }) => {

  const { name, image, price, _id, counter } = ingredient;

  const [, ref] = useDrag({
    type: type,
    item:  { _id, type },
  });

  //Рендер счётчика и его размера
  const renderCounter = (count: number) => {
      if (count > 0) {
        return (count < 10)
        ? <Counter count={count} size={"default"} />
        : (<Counter count={count} size={"small"} />)
      }
  };

  return(
    <Link ref={ref} className={styles.ingredient} id={_id} onClick={() => {
      openIngredient(ingredient);
      console.log(ingredient); 
      }}
      to={"/ingredients/" + ingredient._id}>
      {renderCounter(counter)}
      <img className={styles.image} src={image} alt={name}/>
      <p className={`text text_type_digits-default ${styles.price}`}>{price} <CurrencyIcon type='primary'/></p>
      <h3 className={`text text_type_main-default ${styles.name}`}>{name}</h3>
    </Link>
  )
}