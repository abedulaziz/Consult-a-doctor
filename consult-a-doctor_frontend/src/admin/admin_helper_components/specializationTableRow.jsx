import React, {useState} from "react";
import {useSelector} from 'react-redux';

import axios from 'axios';
import message from '../../helper-components/message';

import {ReactComponent as More} from '../../assets/icons/more-vertical.svg';

const SpecializationTableRow = ({ ID, spec_name, doctorsCount, created_at, updated_at }) => {

   const [rowOptionsVisib, setRowOptionsVisib] = useState("none")
   const userInfo = useSelector((state) => state.userInfo.value);

   const deleteSpec = async() => {

      try {
         const updateInfoRqust = await axios({
           method: "delete",
           url: `/admins/delete-specialization/${ID}`,
           headers: {Authorization: `Bearer ${userInfo.JWT}`, "Content-Type": "multipart/form-data" },
         });
         console.log(updateInfoRqust)
         message(updateInfoRqust.data.message, "green")

       } catch(err) {
         message(err.response.data.message, "red")
       }
   }

   return (
      <>
         <tr>
            <td>{ID}</td>
            <td>{spec_name}</td>
            <td>{doctorsCount}</td>
            <td>{created_at}</td>
            <td>{updated_at}</td>
            <td onClick={() => setRowOptionsVisib(rowOptionsVisib == "none" ? "block" : "none")}><More /></td>
            <div className="options" style={{display: rowOptionsVisib}}>
               <button className="delete" onClick={(ev) => deleteSpec(ev)}>Delete</button>
               <button className="change_img">Change image</button>
            </div>
         </tr>

      </>
   );
};

export default SpecializationTableRow;
