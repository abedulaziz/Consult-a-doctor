import React from 'react'

import { SocketContext} from './SocketContext';

const Notifications = () => {
  const { answerCall, meetingToName } = React.useContext(SocketContext)

  return (
    <div>
        <div className="notifications">
          <h3>{meetingToName.slice(0, meetingToName.indexOf(" "))} is calling...</h3>
          <button id='answerCall' onClick={answerCall}>
            Answer
          </button>
        </div>
    </div>
  )
}

export default Notifications