// components/Payment/Payment.js
import React, { useState, useContext } from 'react';
import './Payment.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

export const Payment = () => {
  const { getTotalCartAmount, clearCart } = useContext(StoreContext);
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    upiId: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Modified to make COD work more reliably
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Payment method selected:", paymentMethod); // Debugging
    
    // If Cash on Delivery is selected, immediately confirm order
    if (paymentMethod === 'cod') {
      console.log("COD selected, proceeding to confirmation"); // Debugging
      clearCart(); // Clear cart
      navigate('/order-confirmation'); // Navigate to order confirmation page
      return;
    }
    
    // For other payment methods, show loading and simulate payment processing
    setLoading(true);
    console.log("Processing payment for:", paymentMethod); // Debugging
    
    // Simulate payment processing
    setTimeout(() => {
      setLoading(false);
      clearCart(); // Clear cart after successful payment
      navigate('/order-confirmation'); // Navigate to order confirmation page
    }, 2000);
  };

  const totalAmount = getTotalCartAmount() + (getTotalCartAmount() === 0 ? 0 : 20);

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h1>Payment Details</h1>
        
        <div className="payment-summary">
          <h2>Order Summary</h2>
          <div className="summary-details">
            <div className="summary-row">
              <span>Subtotal:</span>
              <span>{getTotalCartAmount()} ₹</span>
            </div>
            <div className="summary-row">
              <span>Delivery Fee:</span>
              <span>{getTotalCartAmount() === 0 ? 0 : 20} ₹</span>
            </div>
            <div className="summary-row total">
              <span>Total Amount:</span>
              <span>{totalAmount} ₹</span>
            </div>
          </div>
        </div>

        <div className="payment-methods">
          <h2>Select Payment Method</h2>
          <div className="payment-method-options">
            <button 
              type="button" // Add type="button" to prevent form submission
              className={`method-btn ${paymentMethod === 'card' ? 'active' : ''}`} 
              onClick={() => handlePaymentMethodChange('card')}
            >
              Credit/Debit Card
            </button>
            <button 
              type="button" // Add type="button" to prevent form submission
              className={`method-btn ${paymentMethod === 'upi' ? 'active' : ''}`} 
              onClick={() => handlePaymentMethodChange('upi')}
            >
              UPI Payment
            </button>
            <button 
              type="button" // Add type="button" to prevent form submission
              className={`method-btn ${paymentMethod === 'cod' ? 'active' : ''}`} 
              onClick={() => handlePaymentMethodChange('cod')}
            >
              Cash on Delivery
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {paymentMethod === 'card' && (
            <div className="card-payment">
              <div className="form-group">
                <label>Card Number</label>
                <input 
                  type="text" 
                  name="cardNumber" 
                  value={formData.cardNumber} 
                  onChange={handleInputChange} 
                  placeholder="1234 5678 9012 3456" 
                  required={paymentMethod === 'card'} 
                />
              </div>
              <div className="form-group">
                <label>Name on Card</label>
                <input 
                  type="text" 
                  name="cardName" 
                  value={formData.cardName} 
                  onChange={handleInputChange} 
                  placeholder="Teja" 
                  required={paymentMethod === 'card'} 
                />
              </div>
              <div className="form-row">
                <div className="form-group half">
                  <label>Expiry Date</label>
                  <input 
                    type="text" 
                    name="expiryDate" 
                    value={formData.expiryDate} 
                    onChange={handleInputChange} 
                    placeholder="MM/YY" 
                    required={paymentMethod === 'card'} 
                  />
                </div>
                <div className="form-group half">
                  <label>CVV</label>
                  <input 
                    type="password" 
                    name="cvv" 
                    value={formData.cvv} 
                    onChange={handleInputChange} 
                    placeholder="123" 
                    maxLength="3" 
                    required={paymentMethod === 'card'} 
                  />
                </div>
              </div>
            </div>
          )}

          {paymentMethod === 'upi' && (
            <div className="upi-payment">
              <div className="form-group">
                <label>UPI ID</label>
                <input 
                  type="text" 
                  name="upiId" 
                  value={formData.upiId} 
                  onChange={handleInputChange} 
                  placeholder="example@upi" 
                  required={paymentMethod === 'upi'} 
                />
              </div>
              <p className="upi-info">You will receive a payment request on your UPI app.</p>
            </div>
          )}

          {paymentMethod === 'cod' && (
            <div className="cod-payment">
              <p className="cod-info">You will pay {totalAmount} ₹ at the time of delivery.</p>
            </div>
          )}

          <button 
            type="submit" 
            className="pay-button" 
            disabled={loading}
          >
            {loading ? 'Processing...' : paymentMethod === 'cod' ? 'Confirm Order' : `Pay ${totalAmount} ₹`}
          </button>
        </form>

        <button 
          className="back-button" 
          onClick={() => navigate(-1)}
        >
          Back to Order
        </button>
      </div>
    </div>
  );
};