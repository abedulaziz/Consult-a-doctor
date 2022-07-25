import React, {useContext, useRef} from 'react'

import {CopyToClipboard} from 'react-copy-to-clipboard'
import { SocketContext } from './SocketContext';

// icons
import {ReactComponent as Video} from '../assets/icons/video.svg'
import {ReactComponent as VideoOff} from '../assets/icons/video-off.svg'
import {ReactComponent as Phone} from '../assets/icons/phone-call.svg'
import {ReactComponent as PhoneOff} from '../assets/icons/phone-off.svg'
import {ReactComponent as Mice} from '../assets/icons/mic.svg'
import {ReactComponent as MiceOff} from '../assets/icons/mic-off.svg'

const Options = ({ children }) => {
  const [video, setVideo] = React.useState(<Video />)
  const [mic, setMice] = React.useState(<Mice />)

  const videoButton = React.useRef(null)
  const audioButton = React.useRef(null)

  const {me, myVideo, name, setName, callAccepted, callEnded, call, leaveCall, callUser} = useContext(SocketContext)
  const [idToCall, setIdToCall] = React.useState("");


  const changeMyStreamSet = (ev) => {
    const mediaSetting = {
      video: videoButton.current.classList.contains("media-off") ? false: true,
      audio: audioButton.current.classList.contains("media-off") ? false: true
    }
    
    if (ev.currentTarget.classList.contains("media-off")) {
      ev.currentTarget.classList.remove("media-off")
      mediaSetting[ev.currentTarget.dataset.type] = true


    }else {
      ev.currentTarget.classList.add("media-off")
      mediaSetting[ev.currentTarget.dataset.type] = false
    }
    console.log(mediaSetting)
    if (mediaSetting.video === false && mediaSetting.audio === false) myVideo.current.srcObject = null
    
    else
    navigator.mediaDevices.getUserMedia(mediaSetting)
    .then(myStream => {
      myVideo.current.srcObject = myStream
    })

    mediaSetting.video ? setVideo(<Video />): setVideo(<VideoOff />)
    mediaSetting.audio ? setMice(<Mice />): setMice(<MiceOff />)
  }

  return (
    <div className='options'>

      <div>
        {callAccepted && !callEnded ? (
          <>

            <div className="option_buttons">
              <div ref={videoButton} className="video_status" data-type="video" onClick={(ev) => changeMyStreamSet(ev)}>{ video }</div>

              <div ref={audioButton} className="mic_status" data-type="audio" onClick={(ev) => changeMyStreamSet(ev)}>{ mic }</div>
              
              <div className="call_status" onClick={leaveCall}><PhoneOff /></div>

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
              <div className="call_wrapper" onClick={() => callUser(idToCall)}>
                <Phone />
                <div id='callUser'>Call</div>


                {/* <CopyToClipboard text={idToCall}> */}
                  <input onChange={(e) => setIdToCall(e.target.value)} />

                {/* </CopyToClipboard> */}
              </div>
            )}

          </>

        )}

      </div>
      

    </div>
  )
}

export default Options