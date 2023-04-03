import React from 'react';
import blockStyles from './ingredients-block.module.css';

class IngredientsBlock extends React.Component {

  render() {
    return(
      <div className={blockStyles.ingredientsBlock}>
        <h3 className={blockStyles.title}>{this.props.header}</h3>
        {this.props.content}
      </div>
    )
  }
}

export default IngredientsBlock;