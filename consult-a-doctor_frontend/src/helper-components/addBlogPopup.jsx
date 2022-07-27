import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setPopupVisibility } from "../redux/slices/addBlogPopupSlice";

import axios from "axios";

const AddBlogPopup = () => {
  const popupVisibility = useSelector((state) => state.addBlogPupop.value.PopupVisibitlityClass);
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
    <div className={`cd-popup ${popupVisibility}`}>
      <div className="cd-popup-container">
        <div className="blog-content">
          <h3 className="new_blog_header">Blog content</h3>
          <textarea ref={blogContent} name="content" id="content"></textarea>
        </div>
        <ul className="cd-buttons">
          <li onClick={() => submitBlog()}>
            <a href="#">Submit</a>
          </li>
          <li onClick={() => dispatch(setPopupVisibility(""))}>
            <a href="#">Cancel</a>
          </li>
        </ul>
        <a href="#" className="cd-popup-close img-replace" onClick={() => dispatch(setPopupVisibility(""))}></a>
      </div>
    </div>
  );
};

export default AddBlogPopup;
