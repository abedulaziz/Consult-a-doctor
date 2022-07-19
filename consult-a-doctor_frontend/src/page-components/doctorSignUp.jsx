import React from 'react'
import {Link} from 'react-router-dom';

// layout components
import RegistrationLeftSection from '../layout-components/registrationLeftSection';
import SignUpForm from '../layout-components/signUpForm';

const DoctorSignUp = () => {
  return (
    <div className='background'>
      <div className="sign-up_box regis_box">

        <RegistrationLeftSection isDoctorSignUp={true}/>
        <div className="right-section">
          <div className="heading">
            <h3>Sign up</h3>
            <p>create doctor account to help patients and gain money</p>
          </div>


          <SignUpForm isDoctorSignUp={true} />
          <div className="sign-in_link regis_link">
            Already have an account? <Link to="/sign-in">Log in</Link>
          </div>
          <div className="regis_link doctor_sign-up">
            Normal user? <Link to="/sign-up">sign-up here?</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default DoctorSignUp