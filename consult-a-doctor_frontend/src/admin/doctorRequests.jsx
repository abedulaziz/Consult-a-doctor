import React, { useState, useEffect } from "react";
import Sidebar from "./layout/sidebar";
import Header from "./layout/header";

import AccountRequest from "./admin_helper_components/accountRequest";

import axios from "axios";

const DoctorRequests = () => {
   const [accountRequest, setAccountRequest] = useState(null);

   useEffect(() => {
      try {
         const getAccountRequests = async () => {
            const doctorAccountRqust = await axios.get("/users/get-doctor-account-requests");
            console.log(doctorAccountRqust);

            const accountRequests = doctorAccountRqust.data.account_requests;
            setAccountRequest(accountRequests);
         };
         getAccountRequests();
      } catch (err) {
         console.log(err);
      }
   }, []);
   return (
      <div className="admin_background">
         <Sidebar />
         <div className="container">
            <Header />

            <div className="content_table">
               <h3 className="table_header">Doctor account requests</h3>
               <table>
                  <thead>
                     <tr>
                        <th>First name</th>
                        <th>Last name</th>
                        <th>Email</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Speciality</th>
                        <th>About</th>
                        <th>University</th>
                     </tr>
                  </thead>
                  <tbody>
                     {accountRequest &&
                        accountRequest.map((req) => (
                           <AccountRequest
                              key={req.id}
                              ID={req.id}
                              fname={req.fname}
                              lname={req.lname}
                              email={req.email}
                              password={req.password}
                              gender={req.gender}
                              date_of_birth={req.date_of_birth}
                              speciality_id={req.speciality_id}
                              about={req.about}
                              university={req.university}
                              availabilities={req.availabilities}
                           />
                        ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default DoctorRequests;
