import React from 'react';
import itemStyles from './ingredient-item.module.css';
import {CurrencyIcon, Counter} from '@ya.praktikum/react-developer-burger-ui-components';

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

class IngredientItem extends React.Component {
  render() {
    return(
      <div className={itemStyles.ingredient}>
        {renderCounter(this.props.count)}
        <img className={itemStyles.image} src={this.props.image} alt={this.props.name}/>
        <h3 className={itemStyles.price}>{this.props.price} {<CurrencyIcon/>}</h3>
        <p className={itemStyles.name}>{this.props.name}</p>
      </div>
    )
  }
}

export default IngredientItem;