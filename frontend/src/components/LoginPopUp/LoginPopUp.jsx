import React, { useContext, useState } from 'react';
import './LoginPopUp.css';
import { assets } from '../../assets/frontend_assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const LoginPopUp = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({ name: "", email: "", password: "" });
  const [checkbox, setCheckBox] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));
    if (error) setError("");
  };

  const onChangeCheckBox = (event) => {
    setCheckBox(event.target.checked);
    if (error && event.target.checked) setError("");
  };

  const handleSignupSuccess = async (signupData) => {
    setCurrentState("Login");
    // Preserve email and password for login
    setData(prevData => ({
      ...prevData,
      name: "", // Clear name as it's not needed for login
      email: signupData.email,
      password: signupData.password
    }));
    setError("Registration successful! Please login with your credentials.");
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (!checkbox) {
      setError("Please agree to our terms of service and privacy policy");
      return;
    }

    setLoading(true);
    const isLogin = currentState === 'Login';
    const newUrl = `${url}/api/user/${isLogin ? 'login' : 'register'}`;

    try {
      const response = await axios.post(newUrl, data, {
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: 5000
      });

      if (response.data.success) {
        if (isLogin) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
          setShowLogin(false);
        } else {
          // If signup successful, save data and switch to login
          await handleSignupSuccess(data);
        }
      } else {
        setError(response.data.message || "An error occurred. Please try again.");
      }
    } catch (error) {
      let errorMessage = "An error occurred. Please try again later.";
      
      if (error.response) {
        errorMessage = error.response.data.message || errorMessage;
      } else if (error.code === 'ECONNABORTED') {
        errorMessage = "Request timed out. Please check your connection.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='login-popup'>
      <form onSubmit={onSubmit} className='login-popup-container'>
        <div className="login-popup-title">
          <h2>{currentState}</h2>
          <img 
            onClick={() => setShowLogin(false)} 
            src={assets.cross_icon} 
            alt="Close"
            className="cursor-pointer"
          />
        </div>
        
        {error && (
          <div className={"error-message" }>
            {error}
          </div>
        )}

        <div className="login-popup-inputs">
          {currentState === 'Sign Up' && (
            <input
              name='name'
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              placeholder="Enter Your Name"
              required
              disabled={loading}
            />
          )}
          
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder="Email"
            required
            disabled={loading}
          />
          
          <input
            name='password'
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Enter Password"
            autoComplete="current-password"
            required
            disabled={loading}
          />

          <button 
            type='submit'
            disabled={loading}
            className={loading ? 'opacity-50 cursor-not-allowed' : ''}
          >
            {loading ? 'Please wait...' : currentState === 'Sign Up' ? "Create Account" : "Login"}
          </button>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={checkbox}
              onChange={onChangeCheckBox}
              disabled={loading}
            />
            <span className="text-sm">
              By continuing you agree to our{' '}
              <span className="text-blue-600 cursor-pointer">Terms of Service</span> and{' '}
              <span className="text-blue-600 cursor-pointer">Privacy Policy</span>
            </span>
          </label>

          <div className="login-popup-condition">
            <p>{currentState === 'Login' ? "Don't have an account?" : "Already have an account?"}</p>
            <p 
              className='color-navigation cursor-pointer'
              onClick={() => {
                setCurrentState(currentState === 'Login' ? "Sign Up" : "Login");
                setError("");
                // Only clear data when switching to Sign Up
                if (currentState === 'Login') {
                  setData({ name: "", email: "", password: "" });
                }
              }}
            >
              {currentState === 'Login' ? 'Sign Up' : 'Login'}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginPopUp;