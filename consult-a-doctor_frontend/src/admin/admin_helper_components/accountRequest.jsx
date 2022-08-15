import React from "react";
import {useSelector} from 'react-redux';

import axios from 'axios';
import message from '../../helper-components/message';
import {ReactComponent as More} from '../../assets/icons/more-vertical.svg';

const AccountRequest = ({ID, fname, lname, email, gender, date_of_birth, speciality_id, about, university, password, availabilities}) => {
   const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

   const userInfo = useSelector((state) => state.userInfo.value);
   const [rowOptionsVisib, setRowOptionsVisib] = React.useState("none")

   const denyRequest = async() => {

      try {
         const denyRqust = await axios({
           method: "delete",
           url: `/users/${ID}/deny`,
           headers: {Authorization: `Bearer ${userInfo.JWT}`, "Content-Type": "multipart/form-data" },
         });
         message(denyRqust.data.message, "green")

       } catch(err) {
         message(err.response.data.message, "red")
       }
   }

   const acceptRequest = async() => {

      const accountData = {
         fname,
         lname,
         email,
         password,
         date_of_birth,
         gender,
         speciality_id,
         about,
         type: "doctor",
         university,
         availabilities
      }
      
      try {
         const acceptRqust = await axios({
           method: "post",
           url: `/users/${ID}/accept`,
           data: accountData,
           headers: {Authorization: `Bearer ${userInfo.JWT}`, "Content-Type": "multipart/form-data" },
         });
         message(acceptRqust.data.message, "green")

       } catch(err) {
         message(err.response.data.message, "red")
       }
   }


   return (
      <tr>
         <td>{fname}</td>
         <td>{lname}</td>
         <td>{email}</td>
         <td>{gender}</td>
         <td>{date_of_birth}</td>
         <td>{speciality_id}</td>
         <td>{about}</td>
         <td>{university}</td>
         <td onClick={() => setRowOptionsVisib(rowOptionsVisib == "none" ? "block" : "none")}><More /></td>
         <div className="options" style={{display: rowOptionsVisib}}>
               <button className="deny" onClick={(ev) => denyRequest(ev)}>Deny</button>
               <button className="accept" onClick={() => acceptRequest()}>Accept</button>
            </div>
      </tr>
   );
};

export default AccountRequest;
