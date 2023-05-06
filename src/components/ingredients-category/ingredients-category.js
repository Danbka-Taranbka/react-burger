import styles from './ingredients-category.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';


function IngredientsCategory ({data, title, type, openIngredient}) {

  const renderItem = (ingredientData) => {
    return <li key={ingredientData._id} onClick={() => {openIngredient(ingredientData)}}><IngredientItem data={ingredientData}/></li>
  }

  const typeData = data.filter(element => element.type === type);

  return(
    <div className={`${styles.ingredientsBlock} mt-10`}>
      <h3 className={`text text_type_main-medium ${styles.title}`}>{title}</h3>
      <ul className={`${styles.list} pl-4`}>
      {typeData.map(element => renderItem(element))}
      </ul> 
    </div>
  )
}

export default IngredientsCategory;