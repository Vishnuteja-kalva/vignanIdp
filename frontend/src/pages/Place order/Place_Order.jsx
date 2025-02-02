import React from 'react';
import './Place_Order.css';
import { useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';


const Place_Order = () => {
  const {getTotalCartAmount} = useContext(StoreContext);
  return (
    <div className='place-order'>
      <div className="place-order-left">
        <p className='title' style = {{color:"white"}}>User Information</p>
        <div className="multi-fields">
          <input type="text" placeholder='First Name' required />
          <input type="text" placeholder='Last Name' required />
        </div>
      
          <input type="email" placeholder='Email' required />
          <input type="tel" placeholder='Phone' required />
        
      </div>

      <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} ₹</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:20} ₹</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount()+20} ₹</b>
            </div>
            <hr/>
            <button onClick={()=>{getTotalCartAmount()>20?Navigate('/order'):alert('Order Food')}}>Proceed to Payment</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place_Order;
