import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookMeetingPopup } from "../redux/slices/popupControllerSlice";

import TimeDuration from "../helper-components/timeDuration";

import axios from "axios";
import { useForm } from "react-hook-form";

import { t } from "i18next";
import jwt_decode from 'jwt-decode';

import message from "../helper-components/message";
import DefaultProfilePic from "../assets/backgrounds/default_profile_picture.svg";

const ScheduleMeeting = ({ doctor_id, doctor_profile_pic, doctor_fullname }) => {
   const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
   const [bookMeetingStage, setBookMeetingStage] = useState(1);
   const [availableTimes, setAvailableTimes] = useState(null);
   const [scheduledTimes, setScheduledTiems] = useState(null);
   const [selectedDuration, setSelectedDuration] = useState(null);

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
         const workPeriodsRqust = await axios.post(
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

         setAvailableTimes(workPeriodsRqust.data.available_periods);
         setScheduledTiems(workPeriodsRqust.data.other_appointments);
         setBookMeetingStage(2);
      } catch (err) {
         message(err.response.data.message);
      }
   };

   const submitData = async (data) => {
      if (selectedDuration) {
         const timeTo = new Date(new Date(data.meeting_date + " " + data.meeting_time).getTime() + 5 * 60000).toLocaleTimeString("en-GB", { hour12: false });
         try {
            const confirmMeeting = await axios.post(
               `meetings/appointments/set-appointment`,
               {
                  doctor_id,
                  patient_id: userInfo.sub,
                  title: data.meeting_title,
                  date: data.meeting_date,
                  from: data.meeting_time,
                  to: timeTo,
                  duration: selectedDuration,
               },
               {
                  headers: {
                     Authorization: `Bearer ${localStorage.getItem("JWT")}`,
                  },
               }
            );
            message(confirmMeeting.data.message, false);
            dispatch(setBookMeetingPopup(null));
         } catch (err) {
            message(err.response.data.message);
         }
      } else {
         message("Please select a duration");
      }
   };

   const handleDurationClicked = (ev) => {
      const target = ev.currentTarget;
      const siblings = target.parentElement.childNodes;

      for (let sibling of siblings) {
         sibling.style.backgroundColor = "rgb(221, 220, 220)";
         sibling.style.color = "#000";
      }

      target.style.backgroundColor = "var(--main-theme-color)";
      target.style.color = "#FFF";
      setSelectedDuration(target.dataset.duration);
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
                  <p className="doctor_name">{t("lang.popups.schedule_meeting.pre-name")}{doctor_fullname}</p>
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
                        <h4 className="heading">{t("lang.popups.schedule_meeting.second_step.duration.title")}</h4>
                        <ul className="durations">
                           <li data-duration="5" onClick={(ev) => handleDurationClicked(ev)}>
                              {t("lang.popups.schedule_meeting.second_step.duration.durations.five_min")}
                           </li>
                           <li data-duration="10" onClick={(ev) => handleDurationClicked(ev)}>
                              {t("lang.popups.schedule_meeting.second_step.duration.durations.ten_min")}
                           </li>
                           <li data-duration="20" onClick={(ev) => handleDurationClicked(ev)}>
                              {t("lang.popups.schedule_meeting.second_step.duration.durations.twenty_min")}
                           </li>
                        </ul>
                        <div className="schedule_time">
                           <h4 className="heading">{t("lang.popups.schedule_meeting.second_step.time.title")}</h4>
                           <p className="desc">{t("lang.popups.schedule_meeting.second_step.time.caption")}</p>
                           <div className="input_wrapper">
                              <select
                                 {...register("meeting_time", { required: t("lang.popups.schedule_meeting.second_step.time.unselected_time_mess") })}
                                 type="time"
                                 name="meeting_time"
                                 id="meetingTime"
                              >
                                 {availableTimes && availableTimes.map((availTime) => <option value={availTime.from}>{availTime.from}</option>)}
                              </select>
                              <p className="error">{errors.meeting_time?.message}</p>
                           </div>
                        </div>

                        <div className="meeting_title">
                           <h4 className="heading">{t("lang.popups.schedule_meeting.second_step.title.title")}</h4>
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
                              />
                              <p className="error">{errors.meeting_title?.message}</p>
                           </div>
                        </div>

                        <div className="doctor_times">
                           <div className="booked_times">
                              <h5>{t("lang.popups.schedule_meeting.second_step.booked_times")}</h5>
                              <ul className="unavailable_list">
                                 {scheduledTimes && scheduledTimes.map((takenTime, i) => <TimeDuration key={i} from={takenTime.from} to={takenTime.to} />)}
                              </ul>
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
