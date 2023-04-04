import React from 'react';
import blockStyles from './ingredients-block.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';

class IngredientsBlock extends React.Component {
  renderItem(data) {
    return <IngredientItem data={data}/>
  }
  render() {
    const data = this.props.data.filter(element => element.type === this.props.type);
    return(
      <div className={blockStyles.ingredientsBlock}>
        <h3 className={blockStyles.title}>{this.props.header}</h3>
        {data.map(element => this.renderItem(element))}
      </div>
    )
  }
}

export default IngredientsBlock;