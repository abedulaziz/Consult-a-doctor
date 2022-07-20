import React from 'react'
import {Link} from 'react-router-dom';

// layout components
import RegistrationLeftSection from '../layout-components/registrationLeftSection';
import SignUpForm from '../layout-components/signUpForm';


const SignUp = () => {
  return (
    <div className='background'>
      <div className="sign-up_box regis_box">

        <RegistrationLeftSection />
        <div className="right-section">
          <div className="heading">
            <h3>Sign up</h3>
            <p>Become a member in our community</p>
          </div>


          <SignUpForm />
          <div className="sign-in_link regis_link">
            Already have an account? <Link to="/sign-in">Log in</Link>
          </div>
          <div className="regis_link doctor_sign-up">
            Are you a doctor? <Link to="/doctor/sign-up">sign-up here?</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp