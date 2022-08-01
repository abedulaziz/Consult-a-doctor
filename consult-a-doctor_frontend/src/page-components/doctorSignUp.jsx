import React from "react";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

import { useSelector } from "react-redux";

// layout components
import RegistrationLeftSection from "../layout-components/registrationLeftSection";
import SignUpForm from "../layout-components/signUpForm";
import DoctorSignUpStageTwo from "../layout-components/doctorSignUpStageTwo";

const DoctorSignUp = () => {
   const { t } = useTranslation();
   const signUpStage = useSelector((state) => state.doctorSignUp.stage);

   return (
      <div className="background">
         <div className="sign-up_box regis_box">
            <RegistrationLeftSection isDoctorSignUp={true} />
            <div className="right-section">
               <div className="heading">
                  <h3>{t("lang.doctor_sign_up.header")}</h3>
                  <p>{t("lang.doctor_sign_up.desc")}</p>
               </div>

               {signUpStage === 2 ? <SignUpForm isDoctorSignUp={true} /> : <DoctorSignUpStageTwo />}
               <div className="sign-in_link regis_link">
                  <Trans components={{ Link: <Link /> }}>
                    lang.doctor_sign_up.sign_in_link
                  </Trans>
               </div>
               <div className="regis_link doctor_sign-up">
                  <Trans components={{ Link: <Link /> }}>
                    lang.doctor_sign_up.normal_user_sign_up
                  </Trans>
               </div>
            </div>
         </div>
      </div>
   );
};

export default DoctorSignUp;
