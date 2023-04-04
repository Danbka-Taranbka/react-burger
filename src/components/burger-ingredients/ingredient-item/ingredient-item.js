import React from 'react';
import itemStyles from './ingredient-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

class IngredientItem extends React.Component {
  renderCounter = (count) => {
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

  render() {
    const data = this.props.data;
    return(
      <div className={itemStyles.ingredient}>
        {this.renderCounter(data.__v)}
        <img className={itemStyles.image} src={data.image} alt={data.name}/>
        <h3 className={itemStyles.price}>{data.price} <CurrencyIcon/></h3>
        <p className={itemStyles.name}>{data.name}</p>
      </div>
    )
  }
}

export default IngredientItem;