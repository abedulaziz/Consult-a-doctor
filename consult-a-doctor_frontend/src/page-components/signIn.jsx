import React from 'react';

// icons
import Facebook from '../assets/icons/facebook.svg';
import Instagram from '../assets/icons/instagram.svg';
import Twitter from '../assets/icons/twitter.svg';
import Linkedin from '../assets/icons/linkedin.svg';

const SignIn = () => {
  return (
    <>
      <div className="sign-in_box">

        <div className="left-section">
          <div className="content">

            <div className="brand">
              <img src="" alt="" />
            </div>
            <p>Ease of use - Experienced doctors - Trusted advices</p>
            <div className="social-media_section">
              <p>Check our social media apps</p>
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
        <div className="right-section">
          <form>
            <div className="heading">
              <h3>Sign in</h3>
              <p>Log-in to your account</p>
            </div>
            <div className="email_wrapper">
              <input type="text" name="email" id="email" placeholder='email' />
            </div>
            <div className="password_wrapper">
              <input type="password" name="password" id="password" placeholder='password' />
            </div>
            <div className="button_wrapper">
              <button className="log-in_button"></button>
            </div>
            <div className="sign-up_link">
              Don't have an account? <span>Sign up</span>
            </div>
          </form>
        </div>

      </div>
    </>
  )
}

export default SignIn