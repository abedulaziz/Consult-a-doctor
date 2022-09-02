import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBookMeetingPopup } from "../redux/slices/popupControllerSlice";

import axios from "axios";
import { useForm } from "react-hook-form";

import { t } from "i18next";
import jwt_decode from "jwt-decode";

import message from "../helper-components/message";
import DefaultProfilePic from "../assets/backgrounds/default_profile_picture.svg";

const ScheduleMeeting = ({ doctor_id, doctor_profile_pic, doctor_fullname }) => {
   const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
   const [bookMeetingStage, setBookMeetingStage] = useState(1);
   const [availableTimes, setAvailableTimes] = useState([]);

   const [selectedDuration, setSelectedDuration] = useState(undefined);
   const [selectedTime, setSelectedTime] = useState(undefined);

   const [workingWeekDays, setWorkingWeekDays] = useState([]);

   const userInfo = jwt_decode(localStorage.getItem("JWT"));
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();
   const dispatch = useDispatch();

   useEffect(() => {
      const getWorkingWeekdays = async () => {
         try {
            const workingWeekdaysRqust = await axios.get(`/users/${doctor_id}/working-weekdays`, {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("JWT")}`,
               },
            });
            setWorkingWeekDays(workingWeekdaysRqust.data.working_weekdays);
         } catch (err) {
            message(err.response.data.message);
         }
      };
      getWorkingWeekdays();
   }, []);

   const checkDayAvailability = async (data) => {
      const weekDay = weekDays[new Date(data.meeting_date).getDay()];

      try {
         const availabilitiesRqust = await axios.post(
            `users/${doctor_id}/check-availability`,
            {
               week_day: weekDay,
               date: data.meeting_date,
            },
            {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("JWT")}`,
               },
            }
         );

         console.log(availabilitiesRqust.data);

         setAvailableTimes(availabilitiesRqust.data.available_periods);
         setBookMeetingStage(2);
      } catch (err) {
         message(err.response.data.message);
      }
   };

   const submitData = async (data) => {
      if (selectedDuration && selectedTime) {
         const timeTo = new Date(new Date(data.meeting_date + " " + selectedTime).getTime() + parseInt(selectedDuration) * 60000).toLocaleTimeString("en-GB", {
            hour12: false,
         });
         const meetingData = {
            doctor_id,
            patient_id: userInfo.sub,
            title: data.meeting_title,
            date: data.meeting_date,
            from: selectedTime,
            to: timeTo,
            duration: selectedDuration,
         };

         try {
            const confirmMeeting = await axios.post(`meetings/appointments/set-appointment`, meetingData, {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("JWT")}`,
               },
            });
            message(confirmMeeting.data.message, false);
            dispatch(setBookMeetingPopup(null));
         } catch (err) {
            message(err.response.data.message);
         }
      } else {
         message(`Please select a ${!selectedDuration ? "duration" : "time"}`);
      }
   };

   const handleItemClicked = (ev, setItem, setItemValue) => {
      const target = ev.currentTarget;
      const siblings = target.parentElement.childNodes;

      for (let sibling of siblings) sibling.classList.remove("active");
      target.classList.add("active");

      setItem(setItemValue);
   };

   return (
      <>
         <div className="edit_profile">
            <div className="form_wrapper">
               <div className="profile_pic">
                  <img src={doctor_profile_pic ? doctor_profile_pic : DefaultProfilePic} />
               </div>
               <span className="cd-popup-close img-replace" onClick={() => dispatch(setBookMeetingPopup(null))}></span>

               <div className="popup_header">
                  <h2 className="heading">{t("lang.popups.schedule_meeting.header")}</h2>
                  <p className="doctor_name">
                     {t("lang.popups.schedule_meeting.pre-name")}
                     {doctor_fullname}
                  </p>
               </div>
               <div className="content_wrapper">
                  {bookMeetingStage == 1 ? (
                     <form className="meeting_date" onSubmit={handleSubmit((data) => checkDayAvailability(data))}>
                        <label htmlFor="meetingDate">{t("lang.popups.schedule_meeting.first_step.placeholder")}</label>
                        <div className="meeting_date">
                           <input
                              {...register("meeting_date", { required: t("lang.popups.schedule_meeting.first_step.unselected_date_mess") })}
                              type="date"
                              name="meeting_date"
                              id="meetingDate"
                              min={getStringifiedCurrDate(new Date())}
                           />
                           <p className="error">{errors.meeting_date?.message}</p>
                        </div>
                        <div className="working_weekdays">
                           <p>{t("lang.popups.schedule_meeting.first_step.working_weekdays")}</p>
                           <p className="weekdays">
                              {workingWeekDays.map((weekday, i) =>
                                 i === workingWeekDays.length - 1 ? capitalizeFirstLetter(weekday) : capitalizeFirstLetter(weekday) + " - "
                              )}
                           </p>
                        </div>
                        <div className="submit-date">
                           <button id="scheduleMeetNextStage">{t("lang.popups.schedule_meeting.first_step.next_button")}</button>
                        </div>
                     </form>
                  ) : (
                     <form onSubmit={handleSubmit((data) => submitData(data))} className="meeting_submission">
                        <div className="meeting_container">
                           <div className="meeting_info">
                              <div className="meeting_title">
                                 <div className="title">
                                    <input
                                       {...register("meeting_title", {
                                          required: t("lang.popups.schedule_meeting.second_step.title.empty_title_mess"),
                                          minLength: { value: 5, message: t("lang.popups.schedule_meeting.second_step.title.min_length_mess") },
                                          maxLength: { value: 50, message: t("lang.popups.schedule_meeting.second_step.title.max_length_mess") },
                                       })}
                                       type="text"
                                       name="meeting_title"
                                       id="meetingTitle"
                                       placeholder={t("lang.popups.schedule_meeting.second_step.title.title")}
                                    />
                                    <p className="error">{errors.meeting_title?.message}</p>
                                 </div>
                              </div>
                              <div className="select_duration">
                                 <h4 className="heading">{t("lang.popups.schedule_meeting.second_step.duration.title")}</h4>
                                 <ul className="durations">
                                    <li data-duration="5" onClick={(ev) => handleItemClicked(ev, setSelectedDuration, "5")}>
                                       {t("lang.popups.schedule_meeting.second_step.duration.durations.five_min")}
                                    </li>
                                    <li data-duration="10" onClick={(ev) => handleItemClicked(ev, setSelectedDuration, "10")}>
                                       {t("lang.popups.schedule_meeting.second_step.duration.durations.ten_min")}
                                    </li>
                                    <li data-duration="20" onClick={(ev) => handleItemClicked(ev, setSelectedDuration, "20")}>
                                       {t("lang.popups.schedule_meeting.second_step.duration.durations.twenty_min")}
                                    </li>
                                 </ul>
                              </div>
                           </div>

                           <div className="schedule_time">
                              <h4 className="heading">{t("lang.popups.schedule_meeting.second_step.time.title")}</h4>
                              <div className="availabilities">
                                 {availableTimes.map((avail) => {
                                    const availRemovedSec = avail[0].substring(0, avail[0].length - 3);
                                    return (
                                       <div onClick={(ev) => handleItemClicked(ev, setSelectedTime, avail[0])} className="availability">
                                          {availRemovedSec}
                                       </div>
                                    );
                                 })}
                              </div>
                           </div>
                        </div>

                        <div className="submit-date">
                           <button id="scheduleMeetNextStage">{t("lang.popups.schedule_meeting.second_step.confirm_button")}</button>
                        </div>
                     </form>
                  )}
               </div>
            </div>
         </div>
      </>
   );
};

function getStringifiedCurrDate(date) {
   var mm = date.getMonth() + 1;
   var dd = date.getDate();

   return [date.getFullYear(), (mm > 9 ? "" : "0") + mm, (dd > 9 ? "" : "0") + dd].join("-");
}

function capitalizeFirstLetter(string) {
   return string.charAt(0).toUpperCase() + string.slice(1);
}

export default ScheduleMeeting;
