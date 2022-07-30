import React from "react";

const accountRequest = ({ID, fname, lname, email, gender, date_of_birth, speciality, about, university}) => {
   return (
      <tr>
         <td>{fname}</td>
         <td>{lname}</td>
         <td>{email}</td>
         <td>{gender}</td>
         <td>{date_of_birth}</td>
         <td>{speciality}</td>
         <td>{about}</td>
         <td>{university}</td>
         {/* <td>
            <button className="delete">Delete</button>
            <button className="change_img">Change image</button>
         </td> */}
      </tr>
   );
};

export default accountRequest;
