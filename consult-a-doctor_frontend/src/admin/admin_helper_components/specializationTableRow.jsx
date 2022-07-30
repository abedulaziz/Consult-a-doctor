import React from "react";

const SpecializationTableRow = ({ ID, spec_name, doctorsCount, created_at, updated_at }) => {
   return (
      <tr>
         <td>{ID}</td>
         <td>{spec_name}</td>
         <td>{doctorsCount}</td>
         <td>{created_at}</td>
         <td>{updated_at}</td>
         <td>
            <button className="delete">Delete</button>
            <button className="change_img">Change image</button>
         </td>
      </tr>
   );
};

export default SpecializationTableRow;
