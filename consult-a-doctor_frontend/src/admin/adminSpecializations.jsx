import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {setAddSpecialization} from '../redux/slices/popupControllerSlice'

import axios from "axios";

// layout components
import Sidebar from "./layout/sidebar";
import Header from "./layout/header";

// helper components
import SpecTableRow from "./admin_helper_components/specializationTableRow";
import AddSpecializationPopup from '../helper-components/addSpecializationPopup';

// icons
import { ReactComponent as Plus } from "../assets/icons/plus.svg";

const AdminSpecializations = () => {
   const [specializationsInfo, setSpecializationsInfo] = useState(null);

   const popupController = useSelector(state => state.popupController.value) 
   const dispatch = useDispatch()
   
   useEffect(() => {
      try {
         const getSpecializations = async () => {
            const specRqust = await axios.get("/specializations");

            const specializations = specRqust.data.specializations;
            setSpecializationsInfo(specializations);
         };
         getSpecializations();
      } catch (err) {
      }
   }, []);

   return (
      <div className="admin_background">
         <Sidebar />
         <div className="container">
            <Header />

            <div className="adding_spec" >
               <div className="text">
                  <h3>Add New Specialization</h3>
                  <p>Specializations added here will be global and doctors can commit to.</p>
               </div>

               <div className="add_spec_icon" onClick={() => dispatch(setAddSpecialization(<AddSpecializationPopup />))}>
                  <Plus />
               </div>
            </div>

            <div className="content_table">
               <h3 className="table_header">All specializations</h3>
               <table>
                  <thead>
                     <th>ID</th>
                     <th>Specialization</th>
                     <th>Doctors</th>
                     <th>Created at</th>
                     <th>Updated at</th>
                     <th></th>
                  </thead>
                  <tbody>
                     {specializationsInfo &&
                        specializationsInfo.map((spec) => (
                           <SpecTableRow ID={spec.id} spec_name={spec.name} doctorsCount={spec.speciality_doctors_count} created_at={spec.created_at} updated_at={spec.updated_at} />
                        ))}
                  </tbody>
               </table>
            </div>
         </div>
         {popupController.addSpecialization}
      </div>
   );
};

export default AdminSpecializations;
