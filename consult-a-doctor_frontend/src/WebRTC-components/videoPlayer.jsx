import React, {useContext} from 'react'
import {useSelector, useDispatch} from 'react-redux';

import { SocketContext } from './SocketContext';

const VideoPlayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, call, meetingToName, myName} = useContext(SocketContext)

  return (
    <div className='videos_container'>
      <div className="my-video">
        <p className="name">{myName}</p>
        <div className="video_wrapper">
          <video ref={myVideo} playsInline autoPlay muted></video>
        </div>
      </div>

      <div className="user-video">
        <p className="name">{meetingToName}</p>
        <div className="video_wrapper">
          <video ref={userVideo} playsInline autoPlay ></video>
        </div>
      </div>

    </div>
  )
}

export default VideoPlayer