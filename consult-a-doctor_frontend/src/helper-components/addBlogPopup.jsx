import React from "react";
import { useDispatch } from "react-redux";
import { setAddBlogPopup } from "../redux/slices/popupControllerSlice";
import message from "../helper-components/message";

import RichTextEditor from "../helper-components/richTextEditor";

import axios from "axios";
import jwt_decode from "jwt-decode";
import { t } from "i18next";

const AddBlogPopup = () => {
   const userInfo = jwt_decode(localStorage.getItem("JWT"));
   const dispatch = useDispatch();
   const [blogContent, setBlogContent] = React.useState("");

   const submitBlog = async () => {
      console.log(blogContent);
      if (blogContent !== "<p><br></p>" && blogContent !== "") {
         try {
            let rqustBody = { content: blogContent };
            const doctorInfoRqust = await axios.post(`users/${userInfo.sub}/add-blog`, rqustBody, {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("JWT")}`,
               },
            });
            message(doctorInfoRqust.data.message, "green");
            dispatch(setAddBlogPopup(null));
         } catch (error) {
            console.log(error);
         }
      }
      else {
         message("Empty blog content", "red")
      }

   };

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
            <span className="cd-popup-close img-replace" onClick={() => dispatch(setAddBlogPopup(null))}></span>

            <div className="profile_pic">
               <img src={userInfo.profile_pic_uri} />
            </div>

            <h2 className="heading">{t("lang.popups.add_blog.header")}</h2>

            <RichTextEditor blogContent={setBlogContent} />

            <div className="submit_blog">
               <button id="submit_blog" onClick={() => submitBlog()}>
               {t("lang.popups.add_blog.submit_button")}
               </button>
            </div>
         </div>
      </div>
   );
};

export default AddBlogPopup;
