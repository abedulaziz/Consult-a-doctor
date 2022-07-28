import React from 'react'

const ScheduleMeeting = ({doctor_fullname}) => {
  return (
    <div className="layer">

      <div className='schedule-meeting'>
        <div className="popup_header">
          <h2 className="heading">Schedule a meeting</h2>
          <p>schedule a real-time video chat meeting with ${doctor_fullname}</p>
        </div>

        <div className="meeting_date">
          <label htmlFor="meetingDate">Pick date for the meeting</label>
          <input type="date" name="meeting_date" id="meetingDate" />
        </div>

        <a href="#" className="cd-popup-close img-replace"></a>
        <div className="submit-date">
          <button>Next</button>
        </div>

      </div>
    </div>
  )
}

export default ScheduleMeeting