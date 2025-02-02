import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className="footer-content-left">
          <img src='\src\assets\frontend_assets\Vignan Logo.png' />
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatibus porro quaerat quibusdam magni error itaque possimus rem vel, suscipit ad architecto quas quae quisquam, maiores inventore expedita eius sit odit?</p>
          <div className='footer-social-icons'>
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>Company</h2>
          <ul>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li >Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
        <h2>For any Quries</h2>
        <ul>
          <li>+91 9032013705</li>
          <li>vishnutejakalva@gmail.com</li>
          
        </ul>
        </div>
      </div>
      <hr/>
      <p>@Vishnuteja_Kalva</p>
    </div>
     
  )
}

export default Footer
