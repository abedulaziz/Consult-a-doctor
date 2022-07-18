import React from 'react'

// brand
import Logo from '../assets/brand/transparent_background_brand.png';

// icons
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Twitter from '../assets/icons/twitter.svg';
import Linkedin from '../assets/icons/linkedin.svg';

const RegistrationLeftSection = () => {
  return (
    <div className="left-section">
      <div className="content">

        <div className="brand">
          <img src={ Logo } alt="" />
        </div>
        <p className='brand-statement'>Ease of use - Experienced doctors - Trusted advices</p>
        <div className="social-media_section">
          <p>Check our social media</p>
          <div className="social-media">
            <ul>
              <li className="facebook"><img src={ Facebook } alt="facebook" /></li>
              <li className="instagram"><img src={ Instagram } alt="instagram" /></li>
              <li className="twitter"><img src={ Twitter } alt="twitter" /></li>
              <li className="linkedin"><img src={ Linkedin } alt="linkedin" /></li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  )
}

export default RegistrationLeftSection