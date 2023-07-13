import styles from './ingredient-details.module.css';


export default function IngredientDetails ({ data }) {
  console.log(data)
  const detailsItem = (text, detail) => {
   return (
    <div className={`${styles.info}`}>
       <p className={`text text_type_main-small text_color_inactive mb-2`}>{text}</p>
       <p className={`text text_color_inactive text_type_digits-default`}>{detail}</p>
    </div>
   ) 
  }

  return (
    <div className={styles.main}>
      <h2 className={`text text_type_main-large ${styles.title}`}>Детали ингредиента</h2>
      <img className='mb-4' src={data.image_large} alt={data.name}/>
      <h3 className='text text_type_main-medium mb-8'>{data.name}</h3>
      <div className={styles.details}>
        {detailsItem('Калории, ккал', data.calories)}
        {detailsItem('Белки, г', data.proteins)}
        {detailsItem('Жиры, г', data.fat)}
        {detailsItem('Углеводы, г', data.carbohydrates)}
      </div>
    </div>
  )
}