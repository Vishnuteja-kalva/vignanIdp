import React from 'react'
import './Header.css'
const Header = () => {
  return (
    <div className='header'>
      <div className='header-content'>
        <h2> Order your favourite food here</h2>
        <p>Hunger has a new best friend! Browse, order, and enjoy mouthwatering dishes in minutes!</p>
        <a href ="#explore-menu" id = "Scroll">Scroll Down to Explore 👇</a>
      </div>
    </div>
  )
}

export default Header
