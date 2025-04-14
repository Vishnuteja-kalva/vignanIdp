import React, { useState, useContext } from 'react';
import './Place_Order.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Place_Order = () => {
  const { getTotalCartAmount } = useContext(StoreContext);
  const navigate = useNavigate();
  
  // State to store form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });
  
  // State to track if form was submitted and show validation messages
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  // Validate form data
  const isFormValid = () => {
    return (
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.email.trim() !== '' &&
      formData.phone.trim() !== ''
    );
  };
  
  // Handle proceed to payment
  const handleProceedToPayment = () => {
    setFormSubmitted(true);
    
    if (getTotalCartAmount() <= 0) {
      alert('Please add items to your cart before proceeding');
      return;
    }
    
    if (isFormValid()) {
      navigate('/payment');
    } else {
      // Scroll to top to show validation errors
      window.scrollTo(0, 0);
    }
  };
  
  return (
    <div className='place-order'>
      <div className="place-order-left">
        <p className='title' style={{ color: "white" }}>User Information</p>
        {formSubmitted && !isFormValid() && (
          <div className="error-message" style={{ color: "red", marginBottom: "10px" }}>
            Please fill in all required fields before proceeding
          </div>
        )}
        
        <div className="multi-fields">
          <div className="input-group">
            <input 
              type="text" 
              name="firstName"
              placeholder='First Name' 
              value={formData.firstName}
              onChange={handleInputChange}
              className={formSubmitted && !formData.firstName ? 'input-error' : ''}
              required 
            />
            {formSubmitted && !formData.firstName && (
              <small style={{ color: "red" }}>First name is required</small>
            )}
          </div>
          
          <div className="input-group">
            <input 
              type="text" 
              name="lastName"
              placeholder='Last Name' 
              value={formData.lastName}
              onChange={handleInputChange}
              className={formSubmitted && !formData.lastName ? 'input-error' : ''}
              required 
            />
            {formSubmitted && !formData.lastName && (
              <small style={{ color: "red" }}>Last name is required</small>
            )}
          </div>
        </div>
      
        <div className="input-group">
          <input 
            type="email" 
            name="email"
            placeholder='Email' 
            value={formData.email}
            onChange={handleInputChange}
            className={formSubmitted && !formData.email ? 'input-error' : ''}
            required 
          />
          {formSubmitted && !formData.email && (
            <small style={{ color: "red" }}>Email is required</small>
          )}
        </div>
        
        <div className="input-group">
          <input 
            type="tel" 
            name="phone"
            placeholder='Phone' 
            value={formData.phone}
            onChange={handleInputChange}
            className={formSubmitted && !formData.phone ? 'input-error' : ''}
            required 
          />
          {formSubmitted && !formData.phone && (
            <small style={{ color: "red" }}>Phone number is required</small>
          )}
        </div>
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
              <p>{getTotalCartAmount() === 0 ? 0 : 20} ₹</p>
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              <b>{getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 20)} ₹</b>
            </div>
            <hr/>
            <button onClick={handleProceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Place_Order;