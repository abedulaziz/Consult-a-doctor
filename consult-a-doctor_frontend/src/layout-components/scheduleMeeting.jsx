import React from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { changePopupVisib } from "../redux/slices/bookMeetingSlice";


const ScheduleMeeting = () => {
  
  const bookMeeting = useSelector((state) => state.bookMeeting.value);
  const dispatch = useDispatch()

  return (
    <div className={"layer " + (bookMeeting.isPopupActive && " active")}>

      <div className='schedule-meeting'>
        <div className="popup_header">
          <h2 className="heading">Schedule a meeting</h2>
          <p>schedule a meeting with <span style={{color: "var(--main-theme-color)"}}>{bookMeeting.doctorFullname}</span></p>
        </div>

        <div className="meeting_date">
          <label htmlFor="meetingDate">Pick date for the meeting</label>
          <input type="date" name="meeting_date" id="meetingDate" />
        </div>

        <a href="#" className="cd-popup-close img-replace" onClick={() => dispatch(changePopupVisib(false))}></a>
        <div className="submit-date">
          <button>Next</button>
        </div>

      </div>
    </div>
  )
}

export default ScheduleMeeting