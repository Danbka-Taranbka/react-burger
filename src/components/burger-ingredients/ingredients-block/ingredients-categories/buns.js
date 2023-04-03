import React from 'react';
import N200i from '../../../../images/buns/N-200i.png';
import R2D3 from '../../../../images/buns/R2-D3.png';
import IngredientItem from '../../ingredient-item/ingredient-item.js';
import IngredientsBlock from '../ingredients-block';
import data from '../../../../utils/data.js';

class Buns extends React.Component {
  render () {
    return (<IngredientsBlock header='Булки' content={<>
    <IngredientItem price='20' name='Краторная булка N-200i' image={N200i} count={9} />
    <IngredientItem price='20' name='Флюоресцентная булка R2-D3' image={R2D3} count={100}/>
    </>}
    />)
  }
}

export default Buns; 