import React from "react";

import axios from 'axios';
import message from '../helper-components/message';
import { useDispatch, useSelector } from "react-redux";
import {setAddSpecialization} from '../redux/slices/popupControllerSlice'

import { useForm } from "react-hook-form";

const AddSpecializationPopup = () => {

  const userInfo = useSelector((state) => state.userInfo.value)
   const dispatch = useDispatch()

   const addNewSpecialization = async(data) => {
      data.specialization_image = data.specialization_image[0]

      try {
        const addSpecRqust = await axios({
          method: "post",
          url: "admins/new-specialization",
          data,
          headers: {Authorization: `Bearer ${localStorage.getItem("JWT")}`, "Content-Type": "multipart/form-data" },

        })
        message(addSpecRqust.data.message, false)
        dispatch(setAddSpecialization(null))


     } catch (err) {
        message(err.response.data.message)
     }
   };

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm();

   const displaySelectedImage = (ev) => {

    const selectedImage = ev.target.files[0]
    const reader = new FileReader();

    reader.onload = () => {
      let base64String = reader.result;

      ev.target.previousElementSibling.src = base64String
    }
    reader.readAsDataURL(selectedImage)
   }

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
            <a href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setAddSpecialization(null))}></a>
            {/* <div className="profile_pic">
               <img src={bookMeeting.profile_pic ? bookMeeting.profile_pic : DefaultProfilePic} />
            </div> */}

            <h2 className="heading">Add a new specialization</h2>

            <div className="content_wrapper">
               <form onSubmit={handleSubmit((data) => addNewSpecialization(data))} id="addNewSpecialization" className="add_new_spec">
                  <div className="spec_wrapper">
                     <label htmlFor="specialization"> </label>
                     <input
                        {...register("specialization", {
                           required: "specialization name is required",
                           minLength: { value: 5, message: "Specialization name is too short." },
                        })}
                        type="text"
                        name="specialization"
                        placeholder="Specialization"
                        id="specialization"
                     />
                     <p className="error">{errors.specialization?.message}</p>
                  </div>
                  <div className="edit_pictures">

                    <div className="background_pic_wrapper">
                      <label htmlFor="background_pic">Background image</label>
                      <div className="file_wrapper">
                          <div className="dotted_wrapper">
                            <span className="centered">Pick a picture</span>
                          </div>
                          <img src="" alt="" />
                          <input
                            {...register("specialization_image", {required: 'Please select a background image for the widget'})}
                            type="file"
                            accept="image/*"
                            name="specialization_image"
                            id="specializationImage"
                            placeholder="Specialization name"
                            onChange={(ev) => displaySelectedImage(ev)}
                          />
                          <p className="error">{errors.specialization_image?.message}</p>
                      </div>
                    </div>
                  </div>

                  <div className="button_wrapper">
                     <button id="submitChanges" className="submit_changes">
                        Add specialization
                     </button>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default AddSpecializationPopup;
