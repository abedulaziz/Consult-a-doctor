import React, { createContext, useState } from 'react';
import {io} from 'socket.io-client';
import Peer from 'simple-peer';

const SocketContext = createContext();

const socket = io("http://localhost:5000");
// const socket = null;

const ContextProvider = ({ children }) => {

  const [stream, setStream] = useState(null);
  const [me, setMe] = useState("");
  const [call, setCall] = useState({});
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState("");
  const [meetingToName, setMeetingToName] = useState("")
  const [myName, setMyName] = useState("")
  const [meetingToMeetingID, setMeetingToMeetingID] = useState(null)
  

  const myVideo = React.useRef()
  const userVideo= React.useRef()
  const connectionRef= React.useRef()

  React.useEffect(() => {

    try {
      const getMedia = async() => {
        const mediaRequest = await navigator.mediaDevices.getUserMedia({video: true, audio: true})
        setStream(mediaRequest)
        myVideo.current.srcObject = mediaRequest
        
      }   
      getMedia()
  
      socket.on("me", (id) => setMe(id))
  
      socket.on("callUser", ({from, name: callerName, signal}) => {
        
        setCall({isReceivedCall: true, from, name: callerName, signal})
      })
    } catch (error) {
      console.log(error)
    }


  }, [])

  const answerCall = () => {
    setCallAccepted(true)
    console.log(userVideo);

    const peer = new Peer({ initiator: false, trickle: false, stream})
    
    peer.on("signal", data => {
      socket.emit("answerCall", {signal: data, to: call.from})
    })

    peer.on("stream", currentStream => {
      
      userVideo.current.srcObject = currentStream

      console.log(userVideo.current.srcObject, currentStream)
    })
    peer.signal(call.signal)

    connectionRef.current = peer
  }

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream})
    
    peer.on("signal", data => {
      socket.emit("callUser", {userToCall: id, signalData: data, from: me, name})
    })
    
    peer.on("stream", currentStream => {
      userVideo.current.srcObject = currentStream
    })
    
    socket.on("callAccepted", signal => {
      setCallAccepted(true)

      peer.signal(signal)
    })

    connectionRef.current = peer
  }

  const leaveCall = () => {
    setCallEnded(true);

    // connectionRef.current.destroy();

    window.location.reload();
  };

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
      meetingToName,
      setMeetingToName,
      myName,
      setMyName,
      meetingToMeetingID,
      setMeetingToMeetingID
    }}>
    {children}
    </SocketContext.Provider>
  )

}

export { ContextProvider, SocketContext };