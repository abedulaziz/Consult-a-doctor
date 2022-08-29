import React from 'react'
import {Link} from 'react-router-dom';

import {t} from 'i18next';

// brand
import Logo from '../assets/brand/transparent_background_brand.png';

// backgrounds
import DoctorSignUpBackground from '../assets/backgrounds/doctor_sign-up_background.jpg'

// icons
import Facebook from '../assets/icons/facebook-dark.svg';
import Instagram from '../assets/icons/instagram-dark.svg';
import Twitter from '../assets/icons/twitter-dark.svg';
import Linkedin from '../assets/icons/linkedin-dark.svg';

const RegistrationLeftSection = ({isDoctorSignUp = false}) => {
  const leftSection = React.useRef(null);
  React.useEffect(() => {
    if (isDoctorSignUp) {
      leftSection.current.style.backgroundImage = `url(${DoctorSignUpBackground})`
    }
  }, [])

  return (
    <div className="left-section" ref={leftSection}>
      <div className="content">

        <div className="brand">
          <Link to="/"><img src={ Logo } alt="" /></Link>
        </div>
        <p className='brand-statement'>{t("lang.sign_in.left_section.brand_statement")}</p>
        <div className="social-media_section">
          <p>{t("lang.sign_in.left_section.social_media")}</p>
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