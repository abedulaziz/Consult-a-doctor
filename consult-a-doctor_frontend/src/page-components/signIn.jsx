import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { insertInfo } from '../redux/slices/userSlice'

import { useTranslation, Trans } from 'react-i18next';

import {Link, useNavigate} from 'react-router-dom';
import {useForm} from 'react-hook-form';

// layout components
import RegistrationLeftSection from '../layout-components/registrationLeftSection';

import axios from 'axios';

const SignIn = () => {
  const {t} = useTranslation()
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
      const userInfo = signInRqust.data
      dispatch(insertInfo({access_token: userInfo.access_token, user_id: userInfo.user_id, profile_pic: userInfo.profile_pic}))

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
            <h3>{t("lang.sign_in.sign_in_sec.header")}</h3>
            <p>{t("lang.sign_in.sign_in_sec.desc")}</p>
          </div>


          <form onSubmit={handleSubmit((data) => checkData(data))} id='signIn' className='regis_form'>
            <div className="email">

              <div className="email_wrapper">
                <input {...register("email", {required: "Email is required", pattern:{value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message:"Invalid email"}})}  type="text" name="email" id="email" placeholder={t("lang.sign_in.sign_in_sec.form.email")} />
                <p className="error">{errors.email?.message}</p>
              </div>

            </div>

            <div className="password">

              <div className="password_wrapper">
                <input {...register("password", {required: "Password is required"})} type="password" name="password" id="password" placeholder={t("lang.sign_in.sign_in_sec.form.password")} />
                {/* , pattern:{value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm, message:"Please enter a valid password"} */}
                <p className="error">{errors.password?.message}</p>
              </div>

            </div>
            <div className="button_wrapper">
              <button className="log-in_button regis_button">{t("lang.sign_in.sign_in_sec.form.button")}</button>
            </div>
            <div ref={regisError}></div>
          </form>
          <div className="sign-up_link regis_link">
          <Trans components={{Link: <Link /> }} >
            lang.sign_in.sign_up_link
          </Trans>
            
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignIn