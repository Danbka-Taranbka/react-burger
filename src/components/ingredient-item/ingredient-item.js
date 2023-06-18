import styles from './ingredient-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';


function IngredientItem ({ingredient, openIngredient, type }) {

  const { name, image, price, _id, counter } = ingredient;

  const [, ref] = useDrag({
    type: type,
    item:  { _id, type },
  });

  //Рендер счётчика и его размера
  const renderCounter = (count) => {
    const renderSize = (count) => {
      let size = (count < 10)
      ? 'default'
      : 'small'
      return size;
    }
    if (count > 0) {
      return (<Counter count={count} size={renderSize(count)} />)
    }
  };

  return(
    <div ref={ref} className={styles.ingredient} id={_id} onClick={() => {openIngredient(ingredient)}}>
      {renderCounter(counter)}
      <img className={styles.image} src={image} alt={name}/>
      <p className={`text text_type_digits-default ${styles.price}`}>{price} <CurrencyIcon/></p>
      <h3 className={`text text_type_main-default ${styles.name}`}>{name}</h3>
    </div>
  )
}

IngredientItem.propTypes = {
  ingredient: PropTypes.object.isRequired,
  openIngredient: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
}

export default IngredientItem;