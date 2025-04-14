import React from 'react'
import './Footer.css'
import { assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className='footer-content'>
        <div className="footer-content-left">
          <img
            src={assets.logo}
            width='70px'
            alt='Vignan Logo'
            className='logo'
          />
          <p>Have questions or feedback?
            We're here to help! Reach out anytime — whether it's an order, a suggestion, or just to say hi.
            📞 Call us or 📧 drop an email — we’d love to hear from you!</p>
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
      <hr />
      <p>@Vishnuteja_Kalva</p>
    </div>

  )
}

export default Footer
