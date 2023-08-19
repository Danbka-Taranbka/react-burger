import styles from './ingredients-category.module.css';
import {IngredientItem} from '../ingredient-item/ingredient-item';
import { useSelector } from 'react-redux';
import { FC } from "react";
import { TIngredientsCategory } from '../../utils/types';

export const IngredientsCategory: FC<TIngredientsCategory> = ({title, type, openIngredient, dragType}) => {
  
  const ingredientsList = useSelector((store) => store.ingredients.data)
  
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