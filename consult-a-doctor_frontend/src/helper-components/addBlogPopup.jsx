import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAddBlogPopup } from "../redux/slices/popupControllerSlice";

import axios from "axios";

const AddBlogPopup = () => {
   const userInfo = useSelector((state) => state.userInfo.value);
   const dispatch = useDispatch();
   const blogContent = React.useRef(null);

   const submitBlog = async () => {
      console.log(blogContent.current.value.length);
      if (blogContent.current.value.length !== 0) {
         try {
            let rqustBody = { content: blogContent.current.value };
            const doctorInfoRqust = await axios.post(`users/${userInfo.user_id}/add-blog`, rqustBody, {
               headers: {
                  Authorization: `Bearer ${userInfo.JWT}`,
               },
            });
            console.log(doctorInfoRqust.data);
         } catch (error) {
            console.log(error);
         }
      }
      blogContent.current.focus();
   };

   return (
      <div className="edit_profile">
         <div className="form_wrapper">
            <a href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setAddBlogPopup(null))}></a>

            <div className="profile_pic">
               <img src={userInfo.profile_pic} />
            </div>

            <h2 className="heading">Add new blog</h2>

            <div className="blog-content">
                <textarea ref={blogContent} placeholder="Blog content" name="content" id="content"></textarea>
            </div>
            <div className="submit_blog">
              <button id="submit_blog" onClick={() => submitBlog()}>Submit</button>
            </div>
            <a href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setAddBlogPopup(null))}></a>

         </div>
      </div>
   );
};

export default AddBlogPopup;
