import styles from './ingredient-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';


function IngredientItem ({data, count}) {

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
    <div className={styles.ingredient} id={data._id}>
      {renderCounter(count)}
      <img className={styles.image} src={data.image} alt={data.name}/>
      <p className={`text text_type_digits-default ${styles.price}`}>{data.price} <CurrencyIcon/></p>
      <h3 className={`text text_type_main-default ${styles.name}`}>{data.name}</h3>
    </div>
  )
}

IngredientItem.propTypes = {
  data: PropTypes.object.isRequired
}

export default IngredientItem;