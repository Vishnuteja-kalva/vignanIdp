import React, { useContext } from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const Navigate = useNavigate();
  const { cartItems, food_list, removeFromCart,getTotalCartAmount } = useContext(StoreContext);

  return (
    <div className='cart'>
      <div className="cart-items-item">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {
          food_list.map((item, index) => {
            if (cartItems[item._id] > 0) {
              return (
                <>
                  <div className='cart-items-title cart-items-item'>
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.price} ₹</p>
                    <p>{cartItems[item._id]}</p>
                    <p>{item.price * cartItems[item._id]} ₹</p>
                    <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                  </div>
                  <hr />
                </>

              )
            }
          })
        }
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()} ₹</p>
            </div>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:20} ₹</p>
            </div>
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+20} ₹</b>
            </div>
          </div>
          <button onClick={()=>{getTotalCartAmount()>20?Navigate('/order'):alert('Order Food')}}>Proceed to Checkout</button>
        </div>
        <div className="cart-promocode">
          <div className="cart-promocode-input">
            <p>If you have promocode enter here</p>
            <input type="text" placeholder="Enter Promocode" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
