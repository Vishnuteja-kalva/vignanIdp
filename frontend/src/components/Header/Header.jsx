import React from 'react'
import './Header.css'
import { assets } from '../../assets/frontend_assets/assets'
const Header = () => {
  return (
    <div
      className='header'
      style={{
        backgroundImage: `linear-gradient(rgba(5, 5, 5, 0.5), rgba(7, 7, 7, 0.5)),url(${assets.header})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        height: '400px',
        color: 'white',
      }}
    >

      <div className='header-content'>
        <h2> Order your favourite food here</h2>
        <p>Hunger has a new best friend! Browse, order, and enjoy mouthwatering dishes in minutes!</p>
        <a href="#explore-menu" id="Scroll">Scroll Down to Explore 👇</a>
      </div>
    </div>
  )
}

export default Header
