import styles from './ingredients-category.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { IngredientsContext } from '../../utils/ingredientsContext';
import {ConstructorContext} from '../../utils/constructorContext.js';
import { useContext } from 'react';
import PropTypes from 'prop-types';

const isBun = (current) => {
  if (current.type === 'bun') {
    return (current.price * 2);
  }  else {
    return current.price;
  }
};

function IngredientsCategory ({title, type, openIngredient}) {
  const [constructorState, dispatchConstructorState] = useContext(ConstructorContext);
  const [ingredientsData] = useContext(IngredientsContext);
  
  function handleIngredientClick (data) {
    //Открытие модального окна ингредиента
    //openIngredient(data); 
    
    //Добавление ингредиента в конструктор по клику, в дальнейшем будет заменено на перетаскивание
    const hasBun = constructorState.constructorData.find(element => element.type === 'bun');
    //"Убираем" возможность добавления второй булки в конструктор, нельзя есть слишком много мучного!
    if (hasBun !== undefined && data.type === 'bun') {
      return;
    } else {
      dispatchConstructorState({type: "add", newIngredient: data, isBun: isBun});
    }
  }
  const renderItem = (data) => {
    return <li key={data._id} onClick={() => {handleIngredientClick(data)}}><IngredientItem data={data}/></li>
  }
  
  const typeData = ingredientsData.filter(element => element.type === type);

  return(
    <div className={`${styles.ingredientsBlock} mt-10`}>
      <h3 className={`text text_type_main-medium ${styles.title}`}>{title}</h3>
      <ul className={`${styles.list} pl-4`}>
      {typeData.map(element => renderItem(element))}
      </ul> 
    </div>
  )
}

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  openIngredient: PropTypes.func.isRequired,
}


export default IngredientsCategory;