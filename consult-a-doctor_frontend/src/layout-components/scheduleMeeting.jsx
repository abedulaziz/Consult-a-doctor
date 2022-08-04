import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookMeetingPopup } from "../redux/slices/popupControllerSlice";

const ScheduleMeeting = () => {
   const userInfo = useSelector((state) => state.userInfo.value);
   // const bookMeeting = useSelector((state) => state.bookMeeting.value);
   const dispatch = useDispatch();

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
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
               <input type="date" name="meeting_date" id="meetingDate" />
            </div>

            <div className="submit-date">
               <button id="scheduleMeetNextStage">Next</button>
            </div>
         </div>
      </div>
   );
};

export default ScheduleMeeting;
