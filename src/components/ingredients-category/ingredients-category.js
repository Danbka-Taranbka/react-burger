import styles from './ingredients-category.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { IngredientsContext } from '../../utils/ingredientsContext';
import { useContext } from 'react';



function IngredientsCategory ({data, title, type, openIngredient}) {
  const [constructorData, setConstructorData] = useContext(IngredientsContext);
  
  function handleIngredientClick (ingredientData) {
    const hasBun = constructorData.find(element => element.type === 'bun');
    if (hasBun !== undefined && ingredientData.type === 'bun') {
      return;
    } else {
      setConstructorData([...constructorData, ingredientData]); 
    }   
  }
  const renderItem = (ingredientData) => {
    return <li key={ingredientData._id} onClick={() => {handleIngredientClick(ingredientData)}}><IngredientItem data={ingredientData}/></li>
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