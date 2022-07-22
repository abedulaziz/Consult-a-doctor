import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { insertInfo } from '../redux/slices/userSlice'

import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

// layout components
import RegistrationLeftSection from '../layout-components/registrationLeftSection';

import axios from 'axios';

const SignIn = () => {
  const userInfo = useSelector((state) => state.userInfo)
  const dispatch = useDispatch()

  let navigate = useNavigate()
  const regisError = React.useRef(null)

  const {register, handleSubmit, formState: {errors}} = useForm();
  
  const checkData = async(data) => {
    try {
      const signInRqust = await axios.post("login", {
        email: data.email,
        password: data.password
      })
      console.log(signInRqust);

      dispatch(insertInfo({access_token: signInRqust.data.access_token, user_id: signInRqust.data.user_id}))

      navigate('/')
      
    } catch (err) {
      regisError.current.classList.add("regis_error")
      regisError.current.textContent = "Incorrect email or password."

    }
  }

  return (
    <div className='background'>
      <div className="sign-in_box regis_box">

        <RegistrationLeftSection />

        <div className="right-section">
          <div className="heading">
            <h3>Sign in</h3>
            <p>Log-in to your account</p>
          </div>


          <form onSubmit={handleSubmit((data) => checkData(data))} id='signIn' className='regis_form'>
            <div className="email">

              <div className="email_wrapper">
                <input {...register("email", {required: "Email is required", pattern:{value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message:"Invalid email"}})}  type="text" name="email" id="email" placeholder='email' />
                <p className="error">{errors.email?.message}</p>
              </div>

            </div>

            <div className="password">

              <div className="password_wrapper">
                <input {...register("password", {required: "Password is required"})} type="password" name="password" id="password" placeholder='password' />
                {/* , pattern:{value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, message:"Please enter a valid password"} */}
                <p className="error">{errors.password?.message}</p>
              </div>

            </div>
            <div className="button_wrapper">
              <button className="log-in_button regis_button">Log in</button>
            </div>
            <div ref={regisError}></div>
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