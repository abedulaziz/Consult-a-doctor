import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { deleteInterval, fillInputs, previousStage } from "../redux/slices/doctorSignUpSlice";
import { useForm } from "react-hook-form";
import message from "../helper-components/message";

import { useTranslation } from "react-i18next";

// helper components
import WeekDayAvail from "./weekDayAvail";

// icons
import { ReactComponent as ChevronsRight } from "../assets/icons/chevrons-right.svg";
import axios from "axios";

const DoctorSignUpStageTwo = () => {
   const { t } = useTranslation();
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
      const availabilities = { ...registrationData.value.availabilities };
      const validAvailabilities = getValidAvailabilities(availabilities, weekDays);

      if (!validAvailabilities) return message("You haven't set any availability!");

      const doctorAccountRqust = { ...registrationData.value };
      doctorAccountRqust.availabilities = JSON.stringify(validAvailabilities);
      doctorAccountRqust.university = data.university;
      doctorAccountRqust.speciality_id = data.speciality_id;
      doctorAccountRqust.about = data.about;

      try {
         await axios.post("users/doctor-account-request", doctorAccountRqust);

         message("Your doctor account request has been submitted successfully!.", false);
      } catch (err) {
         message("This email has already been taken");
      }
   };

   React.useEffect(() => {
      const getSpecializations = async () => {
         const SpecRqust = await axios.get("/specializations");

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
                  {...register("speciality_id", { required: "Speciality field is required" })}
                  type="text"
                  name="speciality_id"
                  id="specialityId"
                  placeholder="Speciality"
               >
                  {specializations &&
                     specializations.map((spec) => (
                        <option key={spec.id} spec_id={spec.id} value={spec.id}>
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
               <textarea
                  {...register("about", { required: "This field is required" })}
                  name="about"
                  id="about"
                  placeholder={t("lang.doctor_sign_up.second_step_regis.about.about_placeholder")}
               ></textarea>
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
               <ChevronsRight title="Back" />
            </div>
         </div>
      </form>
   );
};

function getValidAvailabilities(availabilities, weekDays) {
   for (let weekDay in availabilities) {
      if (weekDays.current.querySelector("#" + weekDay).checked) {
         availabilities[weekDay] = availabilities[weekDay].filter((time) => !(time[0] === "00:00" && time[1] === "00:00"));

         !availabilities[weekDay].length && delete availabilities[weekDay];
      } else {
         delete availabilities[weekDay];
      }
   }
   if (!Object.keys(availabilities).length) return null;
   return availabilities;
}

export default DoctorSignUpStageTwo;
