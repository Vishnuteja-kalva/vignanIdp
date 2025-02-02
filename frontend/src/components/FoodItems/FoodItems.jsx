import React, { useContext } from 'react';
import './FoodItems.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItems = ({ id, name, price, description, img }) => {
  const { cartItems, addToCart, removeFromCart } = useContext(StoreContext); 
  const itemCount = cartItems[id]; 
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={img} alt={name} />
        {!itemCount ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="Add to cart"
          />
        ) : (
          <div className="food-item-counter">
            <img
              className="remove-icon"
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="Remove item"
            />
            <p>{itemCount}</p>
            <img
              className="add-more-icon"
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="Add more"
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating stars" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">₹{price}</p>
      </div>
    </div>
  );
};

export default FoodItems;
