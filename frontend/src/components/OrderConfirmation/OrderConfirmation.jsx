import React, { useEffect, useState } from 'react';
import './OrderConfirmation.css';
import { useNavigate } from 'react-router-dom';

export const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [orderId] = useState(`ORD${Math.floor(100000 + Math.random() * 900000)}`);
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    // This is the correct way to handle navigatilon with a timer
    let timer;
    
    if (countdown > 0) {
      timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else {
      // Only navigate when countdown reaches 0
      navigate('/');
    }

    // Cleanup function to clear the timeout
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, navigate]); // Include countdown and navigate in the dependency array

  return (
    <div className="order-confirmation">
      <div className="confirmation-container">
        <div className="success-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        
        <h1>Order Confirmed!</h1>
        <p className="thank-you">Thank you for your order</p>
        
        <div className="order-details">
          <p className="order-id">Order ID: <span>{orderId}</span></p>
          <p>We've received your order and are preparing it right away.</p>
          <p>A confirmation email has been sent to your registered email address.</p>
        </div>
        
        <div className="delivery-info">
          <h2>Estimated Delivery Time</h2>
          <p>30-45 minutes</p>
        </div>
        
        <p className="redirect-message">
          You will be redirected to the home page in {countdown} seconds...
        </p>
        
        <div className="buttons">
          <button 
            className="home-button"
            onClick={() => navigate('/')}
          >
            Return to Home
          </button>
          
          <button 
            className="track-button"
            onClick={() => navigate('/track-order')}
          >
            Track Order
          </button>
        </div>
      </div>
    </div>
  );
};