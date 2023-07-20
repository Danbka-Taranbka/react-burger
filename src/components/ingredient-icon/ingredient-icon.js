import styles from "./ingredient-icon.module.css";
import { useSelector } from "react-redux";

export const IngredientIcon = ({ingredientId, amount, index, location}) => {

  const ingredientsData = useSelector((store) => store.ingredients.data);
  const ingredient = ingredientsData.filter(ingredient => ingredient._id === ingredientId)[0];
  
  const iconStyle = 
 {
    zIndex: `${10 - index}`
  } 
  return (
    <>
    {ingredient && (<div style={iconStyle} className={styles.item}>
      <div className={styles.image} style={{backgroundImage: `url(${ingredient.image})`}}>
      {index > 4 && (
          <div className={styles.overlay}>
            <p className="text text_type_main-default">+{amount}</p>
          </div>
        )}
      </div>
    </div>)}
    </>
  )
}