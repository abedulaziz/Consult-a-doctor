import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookMeetingPopup } from "../redux/slices/popupControllerSlice";

import TimeDuration from "../helper-components/timeDuration";

import axios from "axios";
import { useForm } from "react-hook-form";

import message from "../helper-components/message";

const ScheduleMeeting = ({ doctor_id }) => {
   const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
   const [bookMeetingStage, setBookMeetingStage] = useState(1);
   const [availableTimes, setAvailableTimes] = useState(null);
   const [scheduledTimes, setScheduledTiems] = useState(null);
   const [selectedDuration, setSelectedDuration] = useState(null);

   const selectedMeetingTime = useRef(null)

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
                  Authorization: `Bearer ${userInfo.JWT}`,
               },
            }
         );
         console.log(workPeriodsRqust.data);

         setAvailableTimes(workPeriodsRqust.data.available_periods);
         setScheduledTiems(workPeriodsRqust.data.other_appointments);
         setBookMeetingStage(2);
      } catch (err) {
         message(err.response.data.message, "red");
      }
   };

   const validateMeetingReq = (ev) => {
      ev.preventDefault();

      if (selectedDuration && selectedMeetingTime) {

      }
   };

   const handleDurationClicked = (ev) => {
    const target = ev.currentTarget
    const siblings = target.parentElement.childNodes

    for (let sibling of siblings){
      sibling.style.backgroundColor = "rgb(221, 220, 220)";
      sibling.style.color = "#000";
    }

    target.style.backgroundColor = "var(--main-theme-color)"
    target.style.color = "#FFF";
    setSelectedDuration(target.dataset.duration)
  }

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
                        <li data-duration="5"  onClick={(ev) => handleDurationClicked(ev) }>5 min - 10$</li>
                        <li data-duration="10" onClick={(ev) => handleDurationClicked(ev)}>10 min - 20$</li>
                        <li data-duration="20" onClick={(ev) => handleDurationClicked(ev)}>20 min - 30$</li>
                     </ul>
                     <div className="schedule_time">
                        <h4 className="heading">meeting time: </h4>
                        <p className="desc">Please select time that doesn't conflict with scheduled times if existed</p>
                        <div className="input_wrapper">
                           <select ref={selectedMeetingTime} type="time" name="meeting_time" id="meetingTime">
                              {availableTimes && availableTimes.map((availTime) => <option value={availTime.from}>{availTime.from}</option>)}
                           </select>
                        </div>
                     </div>

                     <div className="doctor_times">

                        <div className="booked_times">
                           <h5>Schuduled times</h5>
                           <ul className="unavailable_list">
                              {scheduledTimes && scheduledTimes.map((takenTime, i) => <TimeDuration key={i} from={takenTime.from} to={takenTime.to} />)}
                           </ul>
                        </div>
                     </div>
                     <div className="submit-date">
                        <button id="scheduleMeetNextStage" onClick={(ev) => validateMeetingReq(ev)}>
                           Confirm meeting
                        </button>
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
