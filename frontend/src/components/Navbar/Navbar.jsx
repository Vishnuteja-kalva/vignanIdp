import React, { useContext, useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';
export const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const [menu, setMenu] = useState('Home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchVisible, setSearchVisible] = useState(false);
  const { getTotalCartAmount, token, setToken, setSearchText } = useContext(StoreContext);
  const searchInputRef = useRef(null);
  const searchIconRef = useRef(null);

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('token');
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearchClick = () => {
    setSearchVisible((prev) => !prev);
    if (!searchVisible) {
      setSearchText(""); 
    }
  };

  // Handle clicks outside the search area
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Only run this if search is visible
      if (searchVisible) {
        const clickedOnSearch = 
          (searchInputRef.current && searchInputRef.current.contains(e.target)) ||
          (searchIconRef.current && searchIconRef.current.contains(e.target));
        
        // 2. Check if clicked on food display or food items
        const clickedOnFoodDisplay = 
          e.target.closest('.food-display') || 
          e.target.closest('.food-item') ||
          e.target.closest('.add') || 
          e.target.closest('.remove-icon') ||
          e.target.closest('.add-more-icon') ||
          e.target.closest('.food-item-counter');
          
        // Don't close if clicked on search elements or food elements
        if (!clickedOnSearch && !clickedOnFoodDisplay) {
          // This is a true "outside click" - close the search
          setSearchVisible(false);
          setSearchText("");
        }
      }
    };

    // Add the event listener
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchVisible, setSearchText]);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleProfileClickOutside = (e) => {
      if (isMenuOpen) {
        const profileElement = document.querySelector('.navbar-profile');
        if (profileElement && !profileElement.contains(e.target)) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleProfileClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleProfileClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="navbar">
      <Link to="/">
        <img src={assets.logo} width="70px" alt="Vignan Logo" className="logo" />
      </Link>

      <ul className="navbar-menu">
        <Link 
          to="/" 
          onClick={() => {
            setMenu('Home');
            setSearchVisible(false);
            setSearchText(""); 
          }} 
          className={menu === 'Home' ? 'active' : ''}
        >
          Home
        </Link>
        <a 
          href="#explore-menu" 
          onClick={() => setMenu('Menu')} 
          className={menu === 'Menu' ? 'active' : ''}
        >
          Menu
        </a>
        <a 
          href="#app-download" 
          onClick={() => setMenu('Mobile-app')} 
          className={menu === 'Mobile-app' ? 'active' : ''}
        >
          Mobile
        </a>
        <a 
          href="#footer" 
          onClick={() => setMenu('Contact-us')} 
          className={menu === 'Contact-us' ? 'active' : ''}
        >
          Contact
        </a>
      </ul>

      <div className="navbar-right">
        {!searchVisible ? (
          <img
            ref={searchIconRef}
            src={assets.search_icon}
            alt="Search"
            className="search-toggle-icon"
            onClick={handleSearchClick}
          />
        ) : (
          <input
            ref={searchInputRef}
            type="text"
            autoFocus
            className="floating-search-input"
            placeholder="Search your favorite food..."
            onChange={(e) => setSearchText(e.target.value)}
            style={{
              position: 'fixed',
              border: '5px solid rgb(13, 12, 12)',
              borderRadius: '10px'
            }}
          />
        )}

        <img 
          className="robo" 
          src={assets.aiRobo} 
          alt="AI" 
          onClick={() => {
            if (!token) setShowLogin(true);
            else navigate('/foodinfo');
          }} 
        />

        <div className="navbar-search-icon">
          <img 
            src={assets.basket_icon} 
            alt="Cart" 
            onClick={() => {
              if (!token) setShowLogin(true);
              else navigate('/cart');
            }} 
          />
          <div className={getTotalCartAmount() === 0 ? '' : 'dot'}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>
            Sign in
          </button>
        ) : (
          <div 
            className="navbar-profile" 
            onClick={(e) => {
              e.stopPropagation();
              toggleMenu();
            }}
          >
            <img src={assets.profile_icon} alt="Profile" />
            {isMenuOpen && (
              <ul className="nav-profile-dropdown">
                <li>
                  <div className="special">
                    <Link to="/orders">
                      <img src={assets.bag_icon} alt="Orders" />
                      <p>Orders</p>
                    </Link>
                  </div>
                </li>
                <hr />
                <li onClick={handleLogout}>
                  <div className="special">
                    <img src={assets.logout_icon} alt="Logout" />
                    <p>Logout</p>
                  </div>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
