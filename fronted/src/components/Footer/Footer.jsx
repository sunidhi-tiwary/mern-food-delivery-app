import React from 'react'
import './Footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>

      {/* CONTAINER (NEW) */}
      <div className="footer-container">

        <div className="footer-content">

          {/* LEFT */}
          <div className="footer-content-left">
            <img src={assets.logo} alt="logo" />
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi dolores nisi doloribus! Hic, at eos. Nobis et voluptatum neque earum corrupti modi sint doloribus voluptatibus, deleniti culpa, quisquam deserunt nemo.
            </p>

            <div className="footer-social-icons">
              <img src={assets.facebook_icon} alt="facebook" />
              <img src={assets.twitter_icon} alt="twitter" />
              <img src={assets.linkedin_icon} alt="linkedin" />
            </div>
          </div>

          {/* CENTER */}
          <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Delivery</li>
              <li>Privacy policy</li>
            </ul>
          </div>

          {/* RIGHT */}
          <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
              <li>+1-212-456-7890</li>
              <li>contact@FOODWORLD.com</li>
            </ul>
          </div>

        </div>

        <hr />

        <p className="footer-copyright">
          Copyright 2024 © Food World - All Right Reserved.
        </p>

      </div>
    </div>
  )
}

export default Footer
