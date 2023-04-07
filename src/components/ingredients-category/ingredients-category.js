import React from 'react';
import styles from './ingredients-category.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';

class IngredientsCategory extends React.Component {
  renderItem(data) {
    return <li key={data._id}><IngredientItem data={data}/></li>
  }
  render() {
    const data = this.props.data.filter(element => element.type === this.props.type);
    return(
      <div className={`${styles.ingredientsBlock} mt-10`}>
        <h3 className={`text text_type_main-medium ${styles.title}`}>{this.props.title}</h3>
        <ul className={`${styles.list} pl-4`}>
        {data.map(element => this.renderItem(element))}
        </ul> 
      </div>
    )
  }
}

export default IngredientsCategory;