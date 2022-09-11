import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import { SocketContext, ContextProvider } from "../WebRTC-components/SocketContext";

import VideoPlayer from "../WebRTC-components/videoPlayer";
import Options from "../WebRTC-components/options";
import Notifications from "../WebRTC-components/notifications";

const Meeting = () => {
   const { me, name, setMyName, stream, setMeetingToName, setMeetingToMeetingID } = useContext(SocketContext);
   const { meeting_id } = useParams();

   useEffect(() => {

      if (me){
         
         console.log(me);
         const sendMeetingID = async () => {
            try {
               const meetingIDRqust = await axios.post(
                  `meetings/${meeting_id}`,
                  { user_meeting_id: me },
                  {
                     headers: {
                        Authorization: `Bearer ${localStorage.getItem("JWT")}`,
                     },
                  }
               );
               const meetingInfo = meetingIDRqust.data;
   
               setMeetingToMeetingID(meetingIDRqust.data.second_party_meeting_id);
   
               const myInfo = meetingInfo.my_info;
               const secPartyInfo = meetingInfo.sec_party_info;
               setMyName(myInfo.fname + " " + myInfo.lname);
               setMeetingToName(secPartyInfo.fname + " " + secPartyInfo.lname);
   
            } catch (err) {
               console.log(err);
            }
         };
         sendMeetingID();
      }
   }, [me]);

   return (
      <div className="screens">
         <div className="screens_wrapper">
            <VideoPlayer />
         </div>

         <Options>
            <Notifications />
         </Options>
      </div>
   );
};

export default Meeting;
