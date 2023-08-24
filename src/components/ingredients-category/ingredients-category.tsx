import styles from './ingredients-category.module.css';
import {IngredientItem} from '../ingredient-item/ingredient-item';
import { FC } from "react";
import { useAppSelector } from '../../hooks/hooks';

export type TIngredientsCategory = {
  title: string;
  type: string;
  openIngredient: Function;
  dragType: string;
};

export const IngredientsCategory: FC<TIngredientsCategory> = ({title, type, openIngredient, dragType}) => {
  
  const ingredientsList = useAppSelector((store) => store.ingredients.data)
  
  const typeData = ingredientsList.filter(element => element.type === type);

  return(
    <div className={`${styles.ingredientsBlock} mt-10`}>
      <h3 className={`text text_type_main-medium ${styles.title}`}>{title}</h3>
      <ul className={`${styles.list} pl-4`}>
      {typeData.map(ingredient => {return <IngredientItem key={ingredient._id} ingredient={ingredient} openIngredient={openIngredient} type={dragType}/>})}
      </ul> 
    </div>
  )
}