import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import {useSelector} from 'react-redux'
import axios from "axios";

import { SocketContext, ContextProvider } from "../WebRTC-components/SocketContext";

import VideoPlayer from "../WebRTC-components/videoPlayer";
import Options from "../WebRTC-components/options";
import Notifications from "../WebRTC-components/notifications";

const Meeting = () => {
   const { me, name, stream } = useContext(SocketContext);
   console.log(me);
   const { meeting_id } = useParams();
   const JWT = useSelector((state) => state.userInfo.value.JWT);

   useEffect(() => {

      const sendMeetingID = async () => {
         try {
            const meetingIDRqust =await axios.post(
               `meetings/${meeting_id}`,
               { user_meeting_id: me },
               {
                  headers: {
                     Authorization: `Bearer ${JWT}`
                  },
               }
            );
            
            console.log(meetingIDRqust)
         } catch (err) {
            console.log(err)
         }
      };
      sendMeetingID();
   
   }, []);

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
