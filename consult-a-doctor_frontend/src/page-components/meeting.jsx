import React from 'react'

import VideoPlayer from '../WebRTC-components/videoPlayer';
import Options from '../WebRTC-components/options';
import Notifications from '../WebRTC-components/notifications';

const Meeting = () => {

  return (
    <>
      <div className="screens">
        <div className="screens_wrapper">

          <div className="video_wrapper">
            <video className='video_player' id='user-1' src="" autoPlay playsInline></video>
          </div>
          <div className="video_wrapper">
            <video className='video_player' id='user-2' src="" autoPlay playsInline></video>
          </div>

        </div>
      </div>

      <VideoPlayer />
      <Options>
        <Notifications />
      </Options>
    </>
  )
}

export default Meeting