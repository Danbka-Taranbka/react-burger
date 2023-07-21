import styles from "./ingredient-icon.module.css";

export const IngredientIcon = ({ingredient, amount, index, location}) => {
  
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