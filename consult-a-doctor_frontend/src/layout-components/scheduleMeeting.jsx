import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookMeetingPopup } from "../redux/slices/popupControllerSlice";

import { useForm } from "react-hook-form";

const ScheduleMeeting = () => {
   const userInfo = useSelector((state) => state.userInfo.value);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   // const bookMeeting = useSelector((state) => state.bookMeeting.value);
   const dispatch = useDispatch();

   const checkDayAvailability = (data) => {

   };

   return (
      <div className="edit_profile">
         <form onSubmit={handleSubmit((data) => checkDayAvailability(data))} className="form_wrapper">
            <span href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setBookMeetingPopup(null))}></span>

            <div className="profile_pic">
               <img src={userInfo.profile_pic} />
            </div>
            {/* <div className="schedule-meeting"> */}
            <div className="popup_header">
               <h2 className="heading">Schedule a meeting</h2>
            </div>

            <div className="meeting_date">
               <label htmlFor="meetingDate">Pick a date for the meeting</label>
               <div className="meeting_date">
                  <input
                     {...register("meeting_date", { required: "Please select a date for the meeting" })}
                     type="date"
                     name="meeting_date"
                     id="meetingDate"
                     min={getStringifiedCurrDate(new Date())}
                  />
                  <p className="error">{errors.meeting_date?.message}</p>
               </div>
            </div>

            <div className="submit-date">
               <button id="scheduleMeetNextStage">Next</button>
            </div>
         </form>
      </div>
   );
};

export default ScheduleMeeting;

function getStringifiedCurrDate(date) {
   var mm = date.getMonth() + 1; // getMonth() is zero-based
   var dd = date.getDate();

   return [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
}
