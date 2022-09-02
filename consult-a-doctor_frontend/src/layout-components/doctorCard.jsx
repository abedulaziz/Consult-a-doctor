import React from "react";

import DefaultPicture from "../assets/backgrounds/default_profile_picture.svg";
import { Link } from "react-router-dom";

// icons
import { ReactComponent as Star } from "../assets/icons/star.svg";
import { ReactComponent as PersonCheck } from "../assets/icons/PersonCheck.svg";

const DoctorCard = ({ doctor_id, profile_pic, fullname, followers, speciality }) => {
   return (
      <div className="card">
         <div className="img_wrapper">
            <img src={profile_pic ? profile_pic : DefaultPicture} />
         </div>

         <div className="doctor-info">
            <h4 className="fullname">{fullname}</h4>
            <p className="speciality">{speciality}</p>
            <div className="rate">
               <Star />
               <Star />
               <Star />
               <Star />
               <Star />
            </div>
            <div className="followers">
               <PersonCheck />
               followers: {followers}
            </div>

            <div className="profile_link">
               <Link to={`/doctor/${doctor_id}/profile`}>Go to profile</Link>
            </div>
         </div>
      </div>
   );
};

export default DoctorCard;
