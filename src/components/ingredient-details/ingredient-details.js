import styles from './ingredient-details.module.css';


export default function IngredientDetails (data) {
  return (
    <div className={styles.main}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h2>
      <img className='mb-4' src={data.image__large} alt={data.name}/>
      <h3 className='text text_type_main-medium mb-8'>{data.name}</h3>
      <div className={styles.details}>
        <p className={`text text_type_main-default text_color_inactive text_type_digits-default${styles.info}`}>Калории, ккал {data.calories}</p>
        <p className={`text text_type_main-default text_color_inactive text_type_digits-default${styles.info}`}>Белки, г {data.proteins}</p>
        <p className={`text text_type_main-default text_color_inactive text_type_digits-default${styles.info}`}>Жиры, г {data.fat}</p>
        <p className={`text text_type_main-default text_color_inactive text_type_digits-default${styles.info}`}>Углеводы, г {data.carbohydrates}</p>
      </div>
    </div>
  )
}