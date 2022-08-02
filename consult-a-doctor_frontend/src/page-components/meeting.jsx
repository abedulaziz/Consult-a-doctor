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
   console.log(me);
   const { meeting_id } = useParams();
   const currentUserInfo = useSelector((state) => state.userInfo.value);


   useEffect(() => {
      const sendMeetingID = async () => {
         try {
            const meetingIDRqust = await axios.post(
               `meetings/${meeting_id}`,
               { user_meeting_id: me },
               {
                  headers: {
                     Authorization: `Bearer ${currentUserInfo.JWT}`,
                  },
               }
            );
            const meetingInfo = meetingIDRqust.data.meeting_info;

            console.log(meetingIDRqust);
            setMeetingToMeetingID(meetingIDRqust.data.second_party_meeting_id);

            if (meetingInfo[0].id == currentUserInfo.ID) {
               setMyName(meetingInfo[0].fname + " " + meetingInfo[0].lname);
               setMeetingToName(meetingInfo[1].fname + " " + meetingInfo[1].lname);
            } else {
               setMyName(meetingInfo[1].fname + " " + meetingInfo[1].lname);
               setMeetingToName(meetingInfo[0].fname + " " + meetingInfo[0].lname);
            }
         } catch (err) {
            console.log(err);
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
