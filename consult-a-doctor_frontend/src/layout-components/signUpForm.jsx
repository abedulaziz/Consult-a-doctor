import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { fillInputs, nextStage, previousStage } from "../redux/slices/doctorSignUpSlice";
import { insertInfo } from "../redux/slices/userSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import message from '../helper-components/message.js';

// icons
import { ReactComponent as ChevronsRight } from "../assets/icons/chevrons-right.svg";
import { t } from "i18next";

const SignUpForm = ({ isDoctorSignUp = false }) => {
   const registrationData = useSelector((state) => state.doctorSignUp);
   const password = React.useRef(null);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const nextSignUpStep = async (data) => {
      if (isDoctorSignUp) {
         dispatch(fillInputs(data));
         dispatch(nextStage());
      } else {
         try {
            const registerRqust = await axios.post(`register`, data);
            const regisInfo = registerRqust.data;

            const JWT = regisInfo.access_token;
            localStorage.setItem("JWT", JWT);
            navigate("/");

         } catch (err) {
            message(err.response.data.email, "red");
         }
      }
   };

   return (
      <form onSubmit={handleSubmit((data) => nextSignUpStep(data))} id="signUp" className="regis_form">
         <div className="fullname">
            <div className="fname_wrapper">
               <input
                  {...register("fname", {
                     required: t("lang.sign_up.user_info_form.fname.empty_fname_mess"),
                     minLength: { value: 2, message: t("lang.sign_up.user_info_form.fname.min_length_mess") },
                     maxLength: { value: 40, message: t("lang.sign_up.user_info_form.fname.max_length_mess") },
                  })}
                  type="text"
                  name="fname"
                  placeholder={t("lang.sign_up.user_info_form.fname.placeholder")}
               />
               <p className="error">{errors.fname?.message}</p>
            </div>
            <div className="lname_wrapper">
               <input
                  {...register("lname", {
                     required: t("lang.sign_up.user_info_form.lname.empty_lname_mess"),
                     minLength: { value: 2, message: t("lang.sign_up.user_info_form.lname.min_length_mess") },
                     maxLength: { value: 40, message: t("lang.sign_up.user_info_form.lname.min_length_mess") },
                  })}
                  type="text"
                  name="lname"
                  placeholder={t("lang.sign_up.user_info_form.lname.placeholder")}
               />
               <p className="error">{errors.lname?.message}</p>
            </div>
         </div>

         <div className="email">
            <div className="email_wrapper">
               <input
                  {...register("email", {
                     required: t("lang.sign_up.user_info_form.email.empty_email_mess"),
                     pattern: { value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, message: t("lang.sign_up.user_info_form.email.invalid_email") },
                  })}
                  type="text"
                  name="email"
                  id="email"
                  placeholder={t("lang.sign_up.user_info_form.email.placeholder")}
               />
               <p className="error">{errors.email?.message}</p>
            </div>
         </div>

         <div className="password">
            <div className="password_wrapper" ref={password}>
               <input
                  {...register("password", {
                     required: t("lang.sign_up.user_info_form.password.empty_pass_mess"),
                     pattern: {
                        value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                        message: t("lang.sign_up.user_info_form.password.invalid_pass"),
                     },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder={t("lang.sign_up.user_info_form.password.placeholder")}
               />
               <p className="error">{errors.password?.message}</p>
            </div>
         </div>
         <div className="password_confirm">
            <div className="password_wrapper">
               <input
                  {...register("password_confirmation", {
                     validate: (value) => value === password.current.querySelector("input#password").value || t("lang.sign_up.user_info_form.password_confirm.unmatched_pass"),
                  })}
                  type="password"
                  name="password_confirmation"
                  id="passwordConfirmation"
                  placeholder={t("lang.sign_up.user_info_form.password_confirm.placeholder")}
               />
               <p className="error">{errors.password_confirmation?.message}</p>
            </div>
         </div>

         <div className="dob">
            <div className="dob_wrapper">
               <span>{t("lang.sign_up.user_info_form.dob.placeholder")}</span>
               <input {...register("date_of_birth", { required: t("lang.sign_up.user_info_form.dob.empty_dob_mess") })} type="date" name="date_of_birth" id="dateOfBirth" />
            </div>
            <p className="error">{errors.date_of_birth?.message}</p>
         </div>

         <div className="gender">
            <div className="gender_wrapper">
               <span className="title">{t("lang.sign_up.user_info_form.gender.label")}</span>
               <div className="selected_gender">
                  <input {...register("gender", { required: t("lang.sign_up.user_info_form.gender.unselected_gender_mess")})} type="radio" id="male" name="gender" value="male" />
                  <label htmlFor="male">{t("lang.sign_up.user_info_form.gender.option_1")}</label>
                  <input {...register("gender", { required: t("lang.sign_up.user_info_form.gender.unselected_gender_mess") })} type="radio" id="female" name="gender" value="female" />
                  <label htmlFor="female">{t("lang.sign_up.user_info_form.gender.option_2")}</label>
               </div>
            </div>
            <p className="error">{errors.gender?.message}</p>
         </div>
         <div className="button_wrapper">
            {isDoctorSignUp ? (
               <button className="sign-up_next_step change_step">
                  <ChevronsRight title="Next" />
               </button>
            ) : (
               <button className="sign-up_button regis_button">{t("lang.sign_up.user_info_form.button")}</button>
            )}
         </div>
      </form>
   );
};

export default SignUpForm;
