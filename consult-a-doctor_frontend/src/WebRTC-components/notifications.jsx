import React from 'react'

import { SocketContext} from './SocketContext';

const Notifications = () => {
  const { answerCall, call, callAccepted } = React.useContext(SocketContext)

  return (
    <div>
        <div className="notifications">
          <h3>{call.name} is calling...</h3>
          <button id='answerCall' onClick={answerCall}>
            Answer
          </button>
        </div>
    </div>
  )
}

export default Notifications