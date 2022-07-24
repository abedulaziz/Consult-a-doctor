import React, { createContext } from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

import { useSelector, useDispatch } from 'react-redux';
import {setDataProperty} from '../redux/slices/webRTCDataSlice'

const SocketContext = createContext();

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const webRTCData = useSelector((state) => state.webRTCData)
  const dispatch = useDispatch()

  const myVideo = React.useRef()
  const userVideo= React.useRef()
  const connectionRef= React.useRef()

  React.useEffect(() => {
    const getMedia = async() => {
      const mediaRequest = await navigator.mediaDevices.getUserMedia({video: true, audio: true})

      console.log(mediaRequest)
      dispatch(setDataProperty({name: "stream", value: mediaRequest}))
      myVideo.current.srcObject = mediaRequest
    }
    getMedia()

    socket.on("me", (id) => dispatch({name: "me", value: id}))

    socket.on("calluser", ({from, name: callerName, signal}) => {
      dispatch(setDataProperty({name: "call", value: {
        isReceivedCall: true, from, name: callerName, signal
      }}))
    })

  }, [])

  const answerCall = () => {
    dispatch(setDataProperty({name: "callAccepted", value: true}))

    const peer = new Peer({ initiator: false, trickle: false, steam: webRTCData.stream})
    
    peer.on("signal", data => {
      socket.emit("answercall", {signal: data, to: webRTCData.call.from})
    })

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream
    })
    peer.signal(webRTCData.call.signal)

    connectionRef.current = peer
  }

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, steam: webRTCData.stream})

    peer.on("signal", data => {
      socket.emit("calluser", {userToCall: id, signalData: data, from: webRTCData.me, name: webRTCData.name})
    })

    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream
    })

    socket.on("callaccepted", signal => {
      webRTCData.callAccepted = true

      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    webRTCData.callEnded = true
    connectionRef.current.destroy()

    window.location.reload()
  }

  return (
    <SocketContext.Provider value={{
      myVideo,
      userVideo,
      connectionRef

    }}>
    {children}
    </SocketContext.Provider>
  )

}

export { ContextProvider, SocketContext };