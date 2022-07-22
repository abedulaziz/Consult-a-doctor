import React from 'react'
// import Agora from '../agora-rtm-sdk-1.4.5.js';




const Meeting = () => {
  let APP_ID = "89d6e8e8b5b944fdbb42f140a6c17b31";
  let token = null;
  let uid =String( Math.floor(Math.random() * 10000))
  let client, channel;

  const userOne = React.useRef(null)
  const userTwo = React.useRef(null)



  const servers = {
    iceServers: [
      {
        urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"]
      }
    ]
  }



  React.useEffect(() => {
    let agoraScript = document.createElement("script")
    agoraScript.src = "../../agora-rtm-sdk-1.4.5.js"
    agoraScript.setAttribute("type", "application/javascript")
    document.body.appendChild(agoraScript)

    let localStream, remoteStream, peerConnection;
    const init = async() => {
      // client = await Agora.AgoraRTM.createInstance(APP_ID)
      await client.login({uid, token})

      channel = client.createChannel("main")
      await channel.join()

      channel.on("MemberJoined", async(memberId) => {
        console.log("A new user joined the channel: ", memberId);
      })

      localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false})

  
      userOne.current.srcObject = localStream
      
      createOffer();
    }
    
    const createOffer = async () => {
      peerConnection = new RTCPeerConnection(servers)
      
      remoteStream = new MediaStream()
      userTwo.current.srcObject = remoteStream


      localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream)
      });

      peerConnection.ontrack = (ev) => {
        ev.streams[0].getTracks().forEach(track => {
          remoteStream.addTrack(track)
        })
      }

      peerConnection.onicecandidate = async (ev) => {
        if (ev.candidate){
          console.log("New ICE candidate: ", ev.candidate);
        }
      }
  
      let offer = await peerConnection.createOffer()
      await peerConnection.setLocalDescription(offer)
  
      console.log("offer", offer);
    }
    init()
  }, [])







  return (
    <>
      <div className="screens">
        <div className="screens_wrapper">

          <div className="video_wrapper">
            <video ref={userOne} className='video_player' id='user-1' src="" autoPlay playsInline></video>
          </div>
          <div className="video_wrapper">
            <video ref={userTwo} className='video_player' id='user-2' src="" autoPlay playsInline></video>
          </div>

        </div>
      </div>
      {/* <script src={Agora}></script> */}
    </>
  )
}

export default Meeting