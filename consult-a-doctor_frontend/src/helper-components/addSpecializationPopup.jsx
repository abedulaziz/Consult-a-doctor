import React from "react";

import { useForm } from "react-hook-form";

const AddSpecializationPopup = () => {
   const addNewSpecialization = (data) => {
      console.log(data);
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
            <a href="#" className="cd-popup-close img-replace"></a>
            {/* <div className="profile_pic">
               <img src={bookMeeting.profile_pic ? bookMeeting.profile_pic : DefaultProfilePic} />
            </div> */}

            <h2 className="heading">Edit your profile</h2>

            <div className="content_wrapper">
               <form onSubmit={handleSubmit((data) =>  addNewSpecialization(data))} id="addNewSpecialization" className="add_new_spec">
                  <div className="spec_wrapper">
                     <label htmlFor="specialization">Specialization name: </label>
                     <input
                        {...register("specialization", { required: "specialization name is required", minLength: { value: 5, message: "Specialization name is too short." } })}
                        type="text"
                        name="specialization"
                        id="specialization"
                     />
                     <p className="error">{errors.specialization?.message}</p>
                  </div>

                  <div className="button_wrapper">
                     <button id="submitChanges" className="submit_changes">
                        Submit
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddSpecializationPopup;
