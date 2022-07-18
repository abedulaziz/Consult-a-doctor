import React from 'react';

import {Link} from 'react-router-dom';

// layout components
import RegistrationLeftSection from '../layout-components/registrationLeftSection';


const SignIn = () => {
  return (
    <div className='background'>
      <div className="sign-in_box regis_box">

        <RegistrationLeftSection />

        <div className="right-section">
          <div className="heading">
            <h3>Sign in</h3>
            <p>Log-in to your account</p>
          </div>


          <form id='signIn' className='regis_form'>
            <div className="email_wrapper">
              <input type="text" name="email" id="email" placeholder='email' />
            </div>
            <div className="password_wrapper">
              <input type="password" name="password" id="password" placeholder='password' />
            </div>
            <div className="button_wrapper">
              <button className="log-in_button regis_button">Log in</button>
            </div>
          </form>
          <div className="sign-up_link regis_link">
            Don't have an existing account? <Link to="/sign-up">Sign up</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn