import React from 'react'
import {Link} from 'react-router-dom';

// layout components
import RegistrationLeftSection from '../layout-components/registrationLeftSection';
import SignUpForm from '../layout-components/signUpForm';

import {useTranslation, Trans} from 'react-i18next';

const SignUp = () => {
  const {t} = useTranslation()
  return (
    <div className='background'>
      <div className="sign-up_box regis_box">

        <RegistrationLeftSection />
        <div className="right-section">
          <div className="heading">
            <h3>{t("lang.sign_up.header")}</h3>
            <p>{t("lang.sign_up.desc")}</p>
          </div>


          <SignUpForm />
          <div className="sign-in_link regis_link">
            <Trans components={{Link: <Link />}}>
              lang.sign_up.sign_in_link
            </Trans>
          </div>
          <div className="regis_link doctor_sign-up">
            <Trans components={{Link: <Link />}}>
                lang.sign_up.doctor_sign_up_link
            </Trans>
          </div>
        </div>

      </div>
    </div>
  )
}

export default SignUp