import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteInterval, fillInputs, previousStage } from "../redux/slices/doctorSignUpSlice";
import { useForm } from "react-hook-form";

import { useTranslation, Trans } from "react-i18next";

// helper components
import WeekDayAvail from "./weekDayAvail";

// icons
import { ReactComponent as ChevronsRight } from "../assets/icons/chevrons-right.svg";
import axios from "axios";

const DoctorSignUpStageTwo = () => {
   const {t} = useTranslation()
   const [specializations, setSpecializations] = React.useState(null);

   const weekDays = React.useRef(null);
   const registrationData = useSelector((state) => state.doctorSignUp);
   const dispatch = useDispatch();

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const requestDoctorAccount = async (data) => {
      const validAvailabilities = { ...registrationData.value.availabilities };
      for (let weekDay in validAvailabilities) {
         if (weekDays.current.querySelector("#" + weekDay).checked) {
            validAvailabilities[weekDay] = validAvailabilities[weekDay].filter((time) => !(time[0] === "00:00" && time[1] === "00:00"));
         } else {
            delete validAvailabilities[weekDay];
         }
      }

      const doctorAccountRqust = { ...registrationData.value };
      doctorAccountRqust.availabilities = JSON.stringify(validAvailabilities);
      doctorAccountRqust.university = data.university;
      doctorAccountRqust.speciality = data.speciality;
      doctorAccountRqust.about = data.about;

      console.log(doctorAccountRqust);

      try {
         await axios.post("users/doctor-account-request", doctorAccountRqust);

         alert("Your doctor account request has been sent.");
      } catch (err) {
         console.log(err);
      }
   };

   React.useEffect(() => {
      const getSpecializations = async () => {
         const SpecRqust = await axios.get("/specializations");

         console.log(SpecRqust);
         setSpecializations(SpecRqust.data.specializations);
      };
      getSpecializations();
   }, []);

   return (
      <form onSubmit={handleSubmit((data) => requestDoctorAccount(data))} id="signUp" className="regis_form">
         <div className="university">
            <div className="university_wrapper">
               <input
                  {...register("university", { required: "Please mention your university" })}
                  type="text"
                  name="university"
                  id="university"
                  placeholder={t("lang.doctor_sign_up.second_step_regis.university")}
               />
               <p className="error">{errors.university?.message}</p>
            </div>
         </div>
         <div className="speciality">
            <div className="speciality_wrapper">
               <h4>{t("lang.doctor_sign_up.second_step_regis.speciality_label")}</h4>
               <select
                  {...register("speciality", { required: "Speciality field is required" })}
                  type="text"
                  name="speciality"
                  id="speciality"
                  placeholder="Speciality"
               >
                  {specializations &&
                     specializations.map((spec) => (
                        <option key={spec.id} value={spec.name}>
                           {spec.name}
                        </option>
                     ))}
               </select>
               <p className="error">{errors.speciality?.message}</p>
            </div>
         </div>
         <div className="about">
            <div className="about_wrapper">
               <h4>{t("lang.doctor_sign_up.second_step_regis.about.label")}</h4>
               <textarea {...register("about", { required: "This field is required" })} name="about" id="about" placeholder={t("lang.doctor_sign_up.second_step_regis.about.about_placeholder")}></textarea>
               <p className="error">{errors.about?.message}</p>
            </div>
         </div>

         <div className="availabilities">
            <h4 className="avail_title">{t("lang.doctor_sign_up.second_step_regis.avail_label")}</h4>
            <div className="week-days" ref={weekDays}>
               <WeekDayAvail weekDay="SUN" name="sunday" id="sunday" />
               <WeekDayAvail weekDay="MON" name="monday" id="monday" />
               <WeekDayAvail weekDay="TUE" name="tuesday" id="tuesday" />
               <WeekDayAvail weekDay="WED" name="wednesday" id="wednesday" />
               <WeekDayAvail weekDay="THU" name="thursday" id="thursday" />
               <WeekDayAvail weekDay="FRI" name="friday" id="friday" />
               <WeekDayAvail weekDay="SAT" name="saturday" id="saturday" />
            </div>
            <p className="error"></p>
         </div>

         <div className="button_wrapper">
            <button className="regis_button submit_doctor_sign-up">{t("lang.doctor_sign_up.second_step_regis.button")}</button>
         </div>

         <div className="button_wrapper">
            <div onClick={() => dispatch(previousStage())} className="sign-up_previous_step change_step">
               <ChevronsRight title="Next" />
            </div>
         </div>
      </form>
   );
};

export default DoctorSignUpStageTwo;
