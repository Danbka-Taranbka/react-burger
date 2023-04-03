import React from 'react';
import IngredientItem from '../../ingredient-item/ingredient-item.js';
import IngredientsBlock from '../ingredients-block';
import data from '../../../../utils/data.js';
import SpaceSouce from '../../../../images/sauces/SpaceSouce.png';
import SpicyX from '../../../../images/sauces/Spicy-X.png';
import galaxy from '../../../../images/sauces/galaxy.png'
import flatwalker from '../../../../images/sauces/flatwalker.png'

class Souces extends React.Component {
  render () {
    return (<IngredientsBlock header='Соусы' content={<>
    <IngredientItem price='30' name='Соус Spicy-X' image={SpicyX} count={9} />
    <IngredientItem price='30' name='Соус фирменный Space Souce' image={SpaceSouce} count={100}/>
    <IngredientItem price='30' name='Соус традиционный галактический' image={galaxy} count={100}/>
    <IngredientItem price='30' name='Соус с шипами Антарианского плоскоходца' image={flatwalker} count={100}/>
    </>}
    />)
  }
}

export default Souces; 