import React, { useContext } from 'react';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import FoodItems from '../FoodItems/FoodItems';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top food is available</h2>
      <div className='food-display-list'>
        {food_list
          .filter((item) => category === 'All' || category === item.category) 
          .map((item, index) => (
            <FoodItems
              key={index} 
              id={item._id}
              name={item.name}
              description={item.description}
              price={item.price}
              img={item.image}
            />
          ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
