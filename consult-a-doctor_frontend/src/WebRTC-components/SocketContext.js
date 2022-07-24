import React, { createContext } from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

import { useSelector, useDispatch } from 'react-redux';
import {setDataProperty} from '../redux/slices/webRTCDataSlice'

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  // const webRTCData = useSelector((state) => state.webRTCData)
  // const dispatch = useDispatch()

  const [stream, setStream] = React.useState(null);
  const [me, setMe] = React.useState("");
  const [call, setCall] = React.useState({});
  const [callAccepted, setCallAccepted] = React.useState(false);
  const [callEnded, setCallEnded] = React.useState(false);
  const [name, setName] = React.useState("");

  const myVideo = React.useRef()
  const userVideo= React.useRef()
  const connectionRef= React.useRef()

  React.useEffect(() => {
    const getMedia = async() => {
      const mediaRequest = await navigator.mediaDevices.getUserMedia({video: true, audio: true})

      console.log(mediaRequest)
      setStream(mediaRequest)
      myVideo.current.srcObject = mediaRequest
    }
    getMedia()

    socket.on("me", (id) => me)

    socket.on("calluser", ({from, name: callerName, signal}) => {
      
      setCall({isReceivedCall: true, from, name: callerName, signal})
    })

  }, [])

  const answerCall = () => {
    setCallAccepted(true)

    const peer = new Peer({ initiator: false, trickle: false, steam: stream})
    
    peer.on("signal", data => {
      socket.emit("answercall", {signal: data, to: call.from})
    })

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream
    })
    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, steam: stream})

    peer.on("signal", data => {
      socket.emit("calluser", {userToCall: id, signalData: data, from: me, name: name})
    })

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream
    })

    socket.on("callaccepted", signal => {
      setCallAccepted(true)

      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true)
    connectionRef.current.destroy()

    window.location.reload()
  }

  return (
    <SocketContext.Provider value={{
      myVideo,
      userVideo,
      call,
      callAccepted,
      stream,
      name,
      setName,
      callEnded,
      me,
      connectionRef,
      answerCall,
      callUser,
      leaveCall,


    }}>
    {children}
    </SocketContext.Provider>
  )

}

export { ContextProvider, SocketContext };