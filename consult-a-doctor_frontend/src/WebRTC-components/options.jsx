import React, {useContext} from 'react'

import {CopyToClipboard} from 'react-copy-to-clipboard'
import { SocketContext } from './SocketContext';

// icons
import {ReactComponent as Video} from '../assets/icons/video.svg'
import {ReactComponent as VideoOff} from '../assets/icons/video-off.svg'
import {ReactComponent as Phone} from '../assets/icons/phone-call.svg'
// import {ReactComponent as Mice} from '../assets/icons/'
import {ReactComponent as MiceOff} from '../assets/icons/mic-off.svg'

const Options = ({ children }) => {
  const [video, setVideo] = React.useState(<Video />)
  const [voice, setVoice] = React.useState(<MiceOff />)

  const {me, name, setName, callAccepted, callEnded, call, leaveCall, callUser} = useContext(SocketContext)
  const [idToCall, setIdToCall] = React.useState("");


  const switchVideo = (ev) => {
    if (ev.target.style.backgroundColor == "red") {
      setVideo(<VideoOff />)
    }
    else {
      setVideo(<Video />)
    }
  }

  return (
    <div className='options'>

        {/* <CopyToClipboard text={me}>
          <button>Copy Your ID</button>

        </CopyToClipboard> */}

      <div>
        {callAccepted && !callEnded ? (
          <>
            <button onClick={leaveCall}>Hang up</button>

            <div className="option_buttons">
              <div className="video_status" onClick={(ev) => switchVideo(ev)}>
                {video}
                
              </div>
              <div className="voice_status" onClick={(ev) => switchVideo(ev)}>
                {voice}
                
              </div>
              <div className="voice_status">
                <MiceOff />
              </div>
              <div className="hang_up">
                <VideoOff />
              </div>

            </div>

          </>
          
        )
        :
        (
          <>
            {call.isReceivedCall && !callAccepted ? (
              children 
            )
            :
            (
              <div className="call_wrapper" onClick={() => callUser(me)}>
                <Phone />
                <div id='callUser'>Call</div>
                {console.log(me)}
              </div>
            )}

          </>

        )}

      </div>
      

    </div>
  )
}

export default Options