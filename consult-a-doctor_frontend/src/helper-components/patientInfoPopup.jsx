import React from "react";
import jwt_decode from "jwt-decode";

import DefaultProfilePic from '../assets/backgrounds/default_profile_picture.svg'

import { useDispatch } from "react-redux";
import { setUserProfilePopup } from "../redux/slices/popupControllerSlice";

const PatientInfoPopup = () => {
   const dispatch = useDispatch();

   const userInfo = jwt_decode(localStorage.getItem("JWT"))

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
            <span href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setUserProfilePopup(null))}></span>
            <div className="profile_pic">
               <img src={userInfo.profile_pic_uri ? userInfo.profile_pic_uri : DefaultProfilePic} />
            </div>

            <h2 className="heading">Personal information</h2>

            <div className="content_wrapper">
              <div className="profile-widget">

                <div className="first_name">
                  <p>First name:</p><p className="info_value">{userInfo.fname}</p>
                </div>
                <div className="last_name">
                  <p>Last name:</p><p className="info_value">{userInfo.lname}</p>
                </div>
                <div className="email">
                  <p>Email:</p><p className="info_value">{userInfo.email}</p>
                </div>
                <div className="age">
                  <p>Age:</p><p className="info_value">{new Date().getFullYear() - new Date(userInfo.dob).getFullYear()} years old</p>
                </div>

              </div>
            </div>
         </div>
      </div>
   );
};

export default PatientInfoPopup;
