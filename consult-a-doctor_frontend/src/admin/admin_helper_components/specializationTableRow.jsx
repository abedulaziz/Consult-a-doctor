import React, {useState} from "react";
import {useSelector} from 'react-redux';

import axios from 'axios';
import message from '../../helper-components/message';

import {ReactComponent as Trash} from '../../assets/icons/trash.svg';

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
         message(updateInfoRqust.data.message, false)

       } catch(err) {
         message(err.response.data.message)
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
            <td onClick={() => setRowOptionsVisib(rowOptionsVisib == "none" ? "block" : "none")}><Trash /></td>
            <div className="options" style={{display: rowOptionsVisib}}>
               <button className="delete" onClick={(ev) => deleteSpec(ev)}>Delete</button>
            </div>
         </tr>

      </>
   );
};

export default SpecializationTableRow;
