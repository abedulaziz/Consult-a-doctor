import React from "react";
import { useNavigate } from "react-router-dom";

import message from '../helper-components/message';

// icons
import { ReactComponent as Clock } from "../assets/icons/clock.svg";
import { ReactComponent as Calender } from "../assets/icons/calendar.svg";

const Appointment = ({ meeting_id, doctor_name, duration, date }) => {
   const navigate = useNavigate();


   const checkMeetingAvailability = () => {

      if (isToday(new Date(date))) {
         navigate(`/meetings/${meeting_id}`)
      }
      else {
         message("Sorry, today is not the date of the meeting")

      }

   }

   return (
      <div className="appointment">
         <div className="heading">
            <h4>Dr. {doctor_name}</h4>
         </div>

         <div className="wrapper">
            <div className="details">
               <div className="time">
                  <Clock />
                  <p className="duration">{duration}</p>
               </div>

               <div className="date">
                  <Calender />
                  <p className="date-details">{date}</p>
               </div>
            </div>

            <div className="options">
               <div className="join" onClick={() => checkMeetingAvailability()}>
                  Join
               </div>
            </div>
         </div>
      </div>
   );
};


const isToday = (someDate) => {
   const today = new Date()
   return someDate.getDate() == today.getDate() &&
      someDate.getMonth() == today.getMonth() &&
      someDate.getFullYear() == today.getFullYear()
}


export default Appointment;
