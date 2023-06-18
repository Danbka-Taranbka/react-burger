import styles from './ingredients-category.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function IngredientsCategory ({title, type, openIngredient, dragType}) {
  
  //function handleIngredientClick (data) {
    //Открытие модального окна ингредиента
    //openIngredient(data); 
    
    /*
    //Добавление ингредиента в конструктор по клику, в дальнейшем будет заменено на перетаскивание
    const hasBun = constructorState.constructorData.find(element => element.type === 'bun');
    //"Убираем" возможность добавления второй булки в конструктор, нельзя есть слишком много мучного!
    if (hasBun !== undefined && data.type === 'bun') {
      return;
    } else {
      dispatchConstructorState({type: "add", newIngredient: data, isBun: isBun});
    }*/
 // }


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

IngredientsCategory.propTypes = {
  title: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  openIngredient: PropTypes.func.isRequired,
  dragType: PropTypes.string.isRequired
}


export default IngredientsCategory;