import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/frontend_assets/assets';
import { Link } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';

export const Navbar = ({ setShowLogin }) => {
    const [menu, setMenu] = useState('Home');
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { getTotalCartAmount, token, setToken } = useContext(StoreContext); // Fixed typo in 'token'

    const handleLogout = () => {
        setToken(""); // Clear token
        localStorage.removeItem('token'); // Remove token from localStorage
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className='navbar'>
            <Link to='/'>
                <img 
                    src='/src/assets/frontend_assets/Vignan Logo.png' 
                    width='70px' 
                    alt='Vignan Logo' 
                    className='logo' 
                />
            </Link>
            
            <ul className='navbar-menu'>
                <Link 
                    to='/' 
                    onClick={() => setMenu('Home')} 
                    className={menu === 'Home' ? 'active' : ''}
                >
                    Home
                </Link>
                <a 
                    href='#explore-menu' 
                    onClick={() => setMenu('Menu')} 
                    className={menu === 'Menu' ? 'active' : ''}
                >
                    Menu
                </a>
                <a 
                    href='#app-download' 
                    onClick={() => setMenu('Mobile-app')} 
                    className={menu === 'Mobile-app' ? 'active' : ''}
                >
                    Mobile
                </a>
                <a 
                    href='#footer' 
                    onClick={() => setMenu('Contact-us')} 
                    className={menu === 'Contact-us' ? 'active' : ''}
                >
                    Contact-us
                </a>
            </ul>

            <div className='navbar-right'>
                <img src={assets.search_icon} alt='Search' />
                <div className='navbar-search-icon'>
                    <Link to='/cart'>
                        <img src={assets.basket_icon} alt='Cart' />
                    </Link>
                    <div className={getTotalCartAmount() === 0 ? "" : 'dot'}></div>
                </div>

                {!token ? (
                    <button onClick={() => setShowLogin(true)}>Sign in</button>
                ) : (
                    <div className='navbar-profile' onClick={toggleMenu}>
                        <img src={assets.profile_icon} alt='Profile' />
                        {isMenuOpen && (
                            <ul className='nav-profile-dropdown'>
                                
                                <li>
                                <div className='special'>
                                    <Link to="/orders" style = {{display: 'flex', alignItems: 'center' , flexDirection:'row',gap:'10px'}} >
                                        <img src={assets.bag_icon} alt="Orders" />
                                        <p>Orders</p>
                                    </Link>
                                    </div>
                                </li>
                               
                                <hr />
                                <li  onClick={handleLogout}>
                                    <div className='special'>
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