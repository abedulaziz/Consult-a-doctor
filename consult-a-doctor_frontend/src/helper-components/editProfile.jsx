import React from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fillInputs } from "../redux/slices/doctorSignUpSlice";

import { insertInfo } from "../redux/slices/userSlice";
import { changePopupVisib, setDoctorFullname } from "../redux/slices/bookMeetingSlice";

// import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

// icons
// import { ReactComponent as ChevronsRight } from "../assets/icons/chevrons-right.svg";
import { t } from "i18next";

const EditProfile = () => {
   const registrationData = useSelector((state) => state.doctorSignUp);
   const bookMeeting = useSelector((state) => state.bookMeeting.value);

   const dispatch = useDispatch();
   const editProfileData = () => {
      console.log("haha");
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
            <div className="profile_pic">
               <img src={bookMeeting.profile_pic} />
            </div>

            <h2 className="heading">Edit your profile</h2>

            <form onSubmit={handleSubmit((data) => editProfileData(data))} id="editProfileData" className="edit_profile_data">
               <div className="fname_wrapper">
                  <label htmlFor="fname">First name: </label>
                  <input
                     {...register("fname", { required: "First name is required", minLength: { value: 2, message: "Minimum length is 2" } })}
                     type="text"
                     name="fname"
                     id="fname"
                     placeholder="First name"
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
                     placeholder="Last name"
                     defaultValue={bookMeeting.lname}
                  />
                  <p className="error">{errors.lname?.message}</p>
               </div>

               <div className="edit_pictures">
                  <div className="profile_pic_wrapper">
                     <label htmlFor="profilePic">Profile picture</label>
                     <div className="file_wrapper">
                        <div className="dotted_wrapper">Pick a picture</div>
                        <input type="file" name="profile_pic" id="profilePic" />
                     </div>
                  </div>

                  <div className="background_pic_wrapper">
                     <label htmlFor="background_pic">Background image</label>
                     <div className="file_wrapper">
                        <div className="dotted_wrapper">Pick a picture</div>
                        <input type="file" name="background_pic" id="backgroundPic" />
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
   );
};

export default EditProfile;
