import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fillInputs } from "../redux/slices/doctorSignUpSlice";
import message from "../helper-components/message";
import jwt_decode from "jwt-decode";

import { changePopupVisib, setDoctorFullname } from "../redux/slices/bookMeetingSlice";
import { setEditProfilePopup } from "../redux/slices/popupControllerSlice";
import DefaultProfilePic from "../assets/backgrounds/default_profile_picture.svg";

// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import { t } from "i18next";

const EditProfile = ({ university, about }) => {
   const registrationData = useSelector((state) => state.doctorSignUp);
   const userID = jwt_decode(localStorage.getItem("JWT")).sub;
   const bookMeeting = useSelector((state) => state.bookMeeting.value);
   const dispatch = useDispatch();

   const editProfileData = async (data) => {
      const { fname, lname, about, university, profile_pic, background_pic } = data;

      const postedData = {
         fname,
         lname,
         about,
         university,
      };
      if (profile_pic.length) postedData["profile_pic"] = profile_pic[0];
      if (background_pic.length) postedData["background_pic"] = background_pic[0];

      try {
         const updateInfoRqust = await axios({
            method: "post",
            url: `users/${userID}/update-info`,
            data: postedData,
            headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}`, "Content-Type": "multipart/form-data" },
         });
         message(updateInfoRqust.data.message, "green");
         dispatch(setEditProfilePopup(null));
      } catch (err) {
         message(err.response.data.message, "red");
      }
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const displaySelectedImage = (ev) => {
      const selectedImage = ev.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
         let base64String = reader.result;

         ev.target.previousElementSibling.src = base64String;
      };
      reader.readAsDataURL(selectedImage);
   };

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
            <span href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setEditProfilePopup(null))}></span>
            <div className="profile_pic">
               <img src={bookMeeting.profile_pic ? bookMeeting.profile_pic : DefaultProfilePic} />
            </div>

            <h2 className="heading">{t("lang.popups.edit_profile.header")}</h2>

            <div className="content_wrapper">
               <form onSubmit={handleSubmit((data) => editProfileData(data))} id="editProfileData" className="edit_profile_data">
                  <div className="fname_wrapper">
                     <label htmlFor="fname">{t("lang.popups.edit_profile.user_info.fname.placeholder")}</label>
                     <input
                        {...register("fname", {
                           required: t("lang.popups.edit_profile.user_info.fname.empty_fname_mess"),
                           minLength: { value: 2, message: t("lang.popups.edit_profile.user_info.fname.min_length_mess") },
                           maxLength: { value: 40, message: t("lang.popups.edit_profile.user_info.fname.max_length_mess") },
                        })}
                        type="text"
                        name="fname"
                        id="fname"
                        defaultValue={bookMeeting.fname}
                     />
                     <p className="error">{errors.fname?.message}</p>
                  </div>
                  <div className="lname_wrapper">
                     <label htmlFor="lname">{t("lang.popups.edit_profile.user_info.lname.placeholder")}</label>
                     <input
                        {...register("lname", {
                           required: t("lang.popups.edit_profile.user_info.lname.empty_lname_mess"),
                           minLength: { value: 2, message: t("lang.popups.edit_profile.user_info.lname.min_length_mess") },
                           maxLength: { value: 40, message: t("lang.popups.edit_profile.user_info.lname.max_length_mess") },
                        })}
                        type="text"
                        name="lname"
                        id="lname"
                        defaultValue={bookMeeting.lname}
                     />
                     <p className="error">{errors.lname?.message}</p>
                  </div>
                  <div className="university_wrapper">
                     <label htmlFor="university">{t("lang.popups.edit_profile.user_info.university.placeholder")}</label>
                     <input
                        {...register("university", { required: t("lang.popups.edit_profile.user_info.university.empty_university_mess") })}
                        type="text"
                        name="university"
                        id="university"
                        defaultValue={university}
                     />
                     <p className="error">{errors.university?.message}</p>
                  </div>
                  <div className="about_wrapper">
                     <label htmlFor="about">{t("lang.popups.edit_profile.user_info.about.placeholder")}</label>
                     <input
                        {...register("about", { required: t("lang.popups.edit_profile.user_info.about.empty_about_mess") })}
                        type="text"
                        name="about"
                        id="about"
                        defaultValue={about}
                     />
                     <p className="error">{errors.about?.message}</p>
                  </div>

                  <div className="edit_pictures">
                     <div className="profile_pic_wrapper">
                        <label htmlFor="profilePic">{t("lang.popups.edit_profile.user_info.profile_picture")}</label>
                        <div className="file_wrapper">
                           <div className="dotted_wrapper">
                              <span className="centered">{t("lang.popups.edit_profile.user_info.image_caption")}</span>
                           </div>
                           <img src="" alt="" />
                           <input
                              {...register("profile_pic")}
                              type="file"
                              accept="image/*"
                              name="profile_pic"
                              id="profilePic"
                              onChange={(ev) => displaySelectedImage(ev)}
                           />
                        </div>
                     </div>

                     <div className="background_pic_wrapper">
                        <label htmlFor="background_pic">{t("lang.popups.edit_profile.user_info.background_image")}</label>
                        <div className="file_wrapper">
                           <div className="dotted_wrapper">
                              <span className="centered">{t("lang.popups.edit_profile.user_info.image_caption")}</span>
                           </div>
                           <img src="" alt="" />
                           <input
                              {...register("background_pic")}
                              type="file"
                              accept="image/*"
                              name="background_pic"
                              id="backgroundPic"
                              onChange={(ev) => displaySelectedImage(ev)}
                           />
                        </div>
                     </div>
                  </div>

                  <div className="button_wrapper">
                     <button id="submitChanges" className="submit_changes">
                     {t("lang.popups.edit_profile.user_info.submit_button")}
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default EditProfile;
