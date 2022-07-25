import React from 'react'

import VideoPlayer from '../WebRTC-components/videoPlayer';
import Options from '../WebRTC-components/options';
import Notifications from '../WebRTC-components/notifications';

const Meeting = () => {

  return (
    <>
      <div className="screens">
        <div className="container">
          <div className="screens_wrapper">

          <VideoPlayer />

          </div>
          <Options>
            <Notifications />
          </Options>

        </div>
      </div>


    </>
  )
}

export default Meeting