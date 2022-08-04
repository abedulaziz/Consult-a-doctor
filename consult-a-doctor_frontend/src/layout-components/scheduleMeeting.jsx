import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookMeetingPopup } from "../redux/slices/popupControllerSlice";

import TimeDuration from "../helper-components/timeDuration";

import axios from "axios";
import { useForm } from "react-hook-form";

import message from '../helper-components/message'

const ScheduleMeeting = ({ doctor_id }) => {
   const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
   const [bookMeetingStage, setBookMeetingStage] = useState(1);
   const [availableTimes, setAvailableTimes] = useState(null);
   const [scheduledTimes, setScheduledTiems] = useState(null);

   const userInfo = useSelector((state) => state.userInfo.value);
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   // const bookMeeting = useSelector((state) => state.bookMeeting.value);
   const dispatch = useDispatch();

   const checkDayAvailability = async (data) => {
      const weekDay = weekDays[new Date(data.meeting_date).getDay()];

      try {
         const workPeriodsRqust = await axios.post(
            `users/${doctor_id}/check-availability`,
            {
               week_day: weekDay,
               date: data.meeting_date,
            },
            {
               headers: {
                  Authorization: `Bearer ${userInfo.JWT}`
               },
            }
         );
         console.log(workPeriodsRqust.data);

         

         setAvailableTimes(workPeriodsRqust.data.available_periods);
         setScheduledTiems(workPeriodsRqust.data.other_appointments);

      } catch (err) {
        message(err.response.data.message, "red")
      }
   };

   return (
      <>
         <div className="edit_profile">
            <form onSubmit={handleSubmit((data) => checkDayAvailability(data))} className="form_wrapper">
               <span href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setBookMeetingPopup(null))}></span>

               <div className="profile_pic">
                  <img src={userInfo.profile_pic} />
               </div>
               <div className="popup_header">
                  <h2 className="heading">Schedule a meeting</h2>
               </div>
               {bookMeetingStage == 1 ? (
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
                     <div className="submit-date">
                        <button id="scheduleMeetNextStage">Next</button>
                     </div>
                  </div>
               ) : (
                  <div className="meeting_submission">
                     <h4 className="heading">Select a duration</h4>
                     <ul className="durations">
                        <li>5 min - 10$</li>
                        <li>10 min - 20$</li>
                        <li>20 min - 30$</li>
                     </ul>
                     <div className="schedule_time">
                        <h4 className="heading">meeting time: </h4>
                        <div className="input_wrapper">
                           <input type="time" name="meeting_time" id="meetingTime" />
                        </div>
                     </div>

                     <div className="doctor_times">
                        <div className="available_times">
                           <h5>Available times</h5>
                           <ul>{availableTimes && availableTimes.map((availTime, i) => <TimeDuration key={i} from={availTime.from} to={availTime.to} />)}</ul>
                        </div>
                        <div className="booked_times">
                           <h5>Schuduled times</h5>
                           <ul>{scheduledTimes && scheduledTimes.map((takenTime, i) => <TimeDuration key={i} from={takenTime.from} to={takenTime.to} />)}</ul>
                        </div>
                     </div>
                     <div className="submit-date">
                        <button id="scheduleMeetNextStage">Confirm meeting</button>
                     </div>
                  </div>
               )}
            </form>
         </div>
      </>
   );
};

export default ScheduleMeeting;

function getStringifiedCurrDate(date) {
   var mm = date.getMonth() + 1; // getMonth() is zero-based
   var dd = date.getDate();

   return [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
}
