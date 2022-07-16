import React from 'react'

// icons
import Logo from '../assets/brand/transparent_background_logo.png';
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Twitter from '../assets/icons/twitter.svg';
import Linkedin from '../assets/icons/linkedin.svg';

// helper components
import FooterLink from '../helper-components/footerLink';

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="footer_content">

          <div className="sections">

            <div className="left-section-links">
              <div className="section">
                <h3 className="registration">Registration</h3>

                <ul>
                  <FooterLink target="/sign-up" alt="sign-up" text="Sign-up as normal user" />
                  <FooterLink target="/doctor/sign-up" alt="doctor sign-up" text="Sign-up as a doctor" />
                </ul>
                
              </div>
              <div className="section">
                <h3 className="log-in">Logging-in</h3>

                <ul>
                  <FooterLink target="/sign-in" alt="sign-in" text="Sign-in to your account" />
                </ul>
                
              </div>
            </div>

            <div className="right-section-links">

              <div className="section">
                <h3 className="sections">Sections</h3>

                <ul>
                  <FooterLink target="/" alt="homepage" text="Home" />
                  <FooterLink target="/doctor/specializations" alt="specializations" text="Specializations"  />
                  <FooterLink target="/doctor/specializations/accounts" alt="doctors page" text="Doctors"  />
                  <FooterLink target="/my-appointments" alt="my appointments" text="My appointments"  />
                </ul>
                
              </div>
            </div>

          </div>
          <div className="buttom_footer">
            <div className="logo">
              <img src={ Logo }/>
            </div>

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
    </footer>
  )
}

export default Footer