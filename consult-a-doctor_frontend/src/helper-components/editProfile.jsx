import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fillInputs } from "../redux/slices/doctorSignUpSlice";
import message from "../helper-components/message";

import { insertInfo } from "../redux/slices/userSlice";
import { changePopupVisib, setDoctorFullname } from "../redux/slices/bookMeetingSlice";
import { setEditProfilePopup } from "../redux/slices/popupControllerSlice";
import DefaultProfilePic from '../assets/backgrounds/default_profile_picture.svg'

// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// icons
// import { ReactComponent as ChevronsRight } from "../assets/icons/chevrons-right.svg";
import { t } from "i18next";

const EditProfile = ({university, about}) => {
   const registrationData = useSelector((state) => state.doctorSignUp);
   const userInfo = useSelector((state) => state.userInfo.value);
   const bookMeeting = useSelector((state) => state.bookMeeting.value);
   const dispatch = useDispatch();

   const editProfileData = async (data) => {
      const {fname, lname, about, university, profile_pic, background_pic} = data

      const postedData = {
         fname,
         lname,
         about,
         university,
      }
      if (profile_pic.length) postedData["profile_pic"] = profile_pic[0]
      if (background_pic.length) postedData["background_pic"] = background_pic[0]


      try {
         const updateInfoRqust = await axios({
           method: "post",
           url: `users/${userInfo.user_id}/update-info`,
           data: postedData,
           headers: {Authorization: `Bearer ${userInfo.JWT}`, "Content-Type": "multipart/form-data" },
         });
         message(updateInfoRqust.data.message, "green")
         dispatch(setEditProfilePopup(null))

       } catch(err) {
         message(err.response.data.message, "red")
       }

   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();


   const displaySelectedImage = (ev) => {

    const selectedImage = ev.target.files[0]
    const reader = new FileReader();

    reader.onload = () => {
      let base64String = reader.result;

      ev.target.previousElementSibling.src = base64String
    }
    reader.readAsDataURL(selectedImage)
   }

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
            <a href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setEditProfilePopup(null)) }></a>
            <div className="profile_pic">
               <img src={bookMeeting.profile_pic ? bookMeeting.profile_pic : DefaultProfilePic} />
            </div>

            <h2 className="heading">Edit your profile</h2>

            <div className="content_wrapper">

               <form onSubmit={handleSubmit((data) => editProfileData(data))} id="editProfileData" className="edit_profile_data">
                  <div className="fname_wrapper">
                     <label htmlFor="fname">First name: </label>
                     <input
                        {...register("fname", { required: "First name is required", minLength: { value: 2, message: "Minimum length is 2" } })}
                        type="text"
                        name="fname"
                        id="fname"
                        defaultValue={bookMeeting.fname}
                     />
                     <p className="error">{errors.fname?.message}</p>
                  </div>
                  <div className="lname_wrapper">
                     <label htmlFor="lname">Last name: </label>
                     <input
                        {...register("lname", { required: "Last name is required", minLength: { value: 2, message: "Minimum length is 2" } })}
                        type="text"
                        name="lname"
                        id="lname"
                        defaultValue={bookMeeting.lname}
                     />
                     <p className="error">{errors.lname?.message}</p>
                  </div>
                  <div className="university_wrapper">
                     <label htmlFor="university">University: </label>
                     <input
                        {...register("university", {required: "University is required"})}
                        type="text"
                        name="university"
                        id="university"
                        defaultValue={university}
                     />
                     <p className="error">{errors.university?.message}</p>
                  </div>
                  <div className="about_wrapper">
                     <label htmlFor="about">About: </label>
                     <input
                        {...register("about", {required: "Your about is required"})}
                        type="text"
                        name="about"
                        id="about"
                        defaultValue={about}
                     />
                     <p className="error">{errors.about?.message}</p>
                  </div>

                  <div className="edit_pictures">
                     <div className="profile_pic_wrapper">
                        <label htmlFor="profilePic">Profile picture</label>
                        <div className="file_wrapper">
                           <div className="dotted_wrapper">
                              <span className="centered">Pick a picture</span>
                           </div>
                           <img src="" alt="" />
                           <input {...register("profile_pic")} type="file" accept="image/*" name="profile_pic" id="profilePic" onChange={(ev) => displaySelectedImage(ev)}/>
                        </div>
                     </div>

                     <div className="background_pic_wrapper">
                        <label htmlFor="background_pic">Background image</label>
                        <div className="file_wrapper">
                           <div className="dotted_wrapper">
                              <span className="centered">Pick a picture</span>
                           </div>
                           <img src="" alt="" />
                           <input {...register("background_pic")} type="file" accept="image/*" name="background_pic" id="backgroundPic" onChange={(ev) => displaySelectedImage(ev)} />
                        </div>
                     </div>
                  </div>

                  <div className="button_wrapper">
                     <button id="submitChanges" className="submit_changes">
                        Submit
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default EditProfile;
