import React from "react";

import axios from "axios";
import message from "../../helper-components/message";
import { ReactComponent as More } from "../../assets/icons/more-vertical.svg";

const AccountRequest = ({ ID, fname, lname, email, gender, date_of_birth, speciality_id, about, university, password, availabilities }) => {
   const reqOptions = React.useRef(null);
   const specRow = React.useRef(null);

   const denyRequest = async (ev) => {
      const target = ev.currentTarget;
      target.setAttribute("disabled", "disabled");

      try {
         const denyRqust = await axios({
            method: "delete",
            url: `/users/${ID}/deny`,
            headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}`, "Content-Type": "multipart/form-data" },
         });
         message(denyRqust.data.message, false);
         specRow.current.remove();
      } catch (err) {
         message(err.response.data.message);
      }

      target.removeAttribute("disabled");
      reqOptions.current.style.display = "none";
   };

   const acceptRequest = async (ev) => {
      const target = ev.currentTarget;
      target.setAttribute("disabled", "disabled");

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
         availabilities,
      };

      try {
         const acceptRqust = await axios({
            method: "post",
            url: `/users/${ID}/accept`,
            data: accountData,
            headers: { Authorization: `Bearer ${localStorage.getItem("JWT")}`, "Content-Type": "multipart/form-data" },
         });
         message(acceptRqust.data.message, false);
         specRow.current.remove();
      } catch (err) {
         message(err.response.data.message);
      }

      target.removeAttribute("disabled");
      reqOptions.current.style.display = "none";
   };

   return (
      <tr ref={specRow}>
         <td>{fname}</td>
         <td>{lname}</td>
         <td>{email}</td>
         <td>{gender}</td>
         <td>{date_of_birth}</td>
         <td>{speciality_id}</td>
         <td>{about}</td>
         <td>{university}</td>
         <td
            onClick={() => {
               if (reqOptions.current.style.display == "none") {
                  reqOptions.current.style.display = "block";
                  reqOptions.current.focus();
               }
            }}
         >
            <More />
         </td>
         <div
            ref={reqOptions}
            style={{ display: "none" }}
            className="options"
            tabIndex="-1"
            onBlur={(ev) => {
               if (!ev.currentTarget.contains(ev.relatedTarget)) {
                  ev.currentTarget.style.display = "none";
               }
            }}
         >
            <button className="deny" onClick={(ev) => denyRequest(ev)}>
               Deny
            </button>
            <button className="accept" onClick={(ev) => acceptRequest(ev)}>
               Accept
            </button>
         </div>
      </tr>
   );
};

export default AccountRequest;
