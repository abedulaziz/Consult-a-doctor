import React from 'react'

const ScheduleMeeting = ({doctor_fullname}) => {
  return (
    <div className='schedule-meeting'>
      <div className="popup_header">
        <h2 className="heading">Schedule a meeting</h2>
        <p>schedule a real-time video chat meeting with ${doctor_fullname}</p>
      </div>

      <div className="meeting_date">
        <input type="date" name="meeting_date" id="meetingDate" />
      </div>

      <div className="submit-date">
        <button>Submit date</button>
      </div>
    </div>
  )
}

export default ScheduleMeeting