import React from 'react'
import {Link} from 'react-router-dom';

// layout components
import RegistrationLeftSection from '../layout-components/registrationLeftSection';


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


          <form id='signUp' className='regis_form'>
            <div className="fullname">
              <input type="text" name="fname" placeholder='First name' />
              <input type="text" name="lname" placeholder='Last name' />
            </div>
            <div className="email_wrapper">
              <input type="text" name="email" id="email" placeholder='Email' />
            </div>
            <div className="password_wrapper">
              <input type="password" name="password" id="password" placeholder='Password' />
            </div>
            <div className="dob">
              <span>Date of birth:</span>
              <input type="date" name="date_of_birth" id="dateOfBirth" />
            </div>
            <div className="gender">
              <span>Gender:</span>
              <div className="selected_gender">

                <input type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">Male</label>
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Female</label>

              </div>
            </div>
            <div className="button_wrapper">
              <button className="sign-up_button regis_button">Register</button>
            </div>
          </form>
          <div className="sign-in_link regis_link">
            Already have an account? <Link to="/sign-in">Log in</Link>
          </div>
          <div className="regis_link doctor_sign-up">
            Are you a doctor? <Link to="/sign-in">sign-up here?</Link>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp