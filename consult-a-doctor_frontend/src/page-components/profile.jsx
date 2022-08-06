import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../helper-components/loader";

import axios from "axios";

// layout components
import Header from "../layout-components/header";
import Footer from "../layout-components/footer";
import Post from "../layout-components/post";
import ScheduleMeeting from "../layout-components/scheduleMeeting";
import EditProfile from "../helper-components/editProfile";

// icons
import { ReactComponent as Heart } from "../assets/icons/heart.svg";
import { ReactComponent as Plus } from "../assets/icons/plus.svg";
import { ReactComponent as Edit } from "../assets/icons/edit-profile.svg";
import DefaultProfilePic from '../assets/backgrounds/default_profile_picture.svg';

// helper components
import AddBlogPopup from "../helper-components/addBlogPopup";

import { setPopupVisibility } from "../redux/slices/addBlogPopupSlice";
import { changePopupVisib, setName, setDoctorProfilePic } from "../redux/slices/bookMeetingSlice";
import { setEditProfilePopup, setAddBlogPopup, setBookMeetingPopup } from "../redux/slices/popupControllerSlice";

const Profile = () => {
   const [loader, setLoader] = useState(<Loader />);
   const dispatch = useDispatch();

   let navigate = useNavigate();
   const [backgroundPic, setBackgroundPic] = useState(null)
   const [university, setUniversity] = useState("");
   const [about, setAbout] = useState("");
   const [blogs, setBlogs] = useState([]);
   const [followers, setFollowers] = useState(0);
   const [followings, setFollowings] = useState(0);

   const [isAccountOwner, setIsAccountOwner] = useState(false);

   const userInfo = useSelector((state) => state.userInfo.value);
   const bookMeeting = useSelector((state) => state.bookMeeting.value);
   const popupController = useSelector((state) => state.popupController.value);
   const { doctor_id } = useParams();

   React.useEffect(() => {
      const getDoctorInfo = async () => {
         try {
            const doctorInfoRqust = await axios.get(`users/${doctor_id}/doctor-info`, {
               headers: {
                  Authorization: `Bearer ${userInfo.JWT}`,
               },
            });
            console.log(doctorInfoRqust.data);

            const doctorInfo = doctorInfoRqust.data.doctor_info;

            // setFullname(doctorInfo.fname + " " + doctorInfo.lname);
            dispatch(setName({ prop: "fname", value: doctorInfo.fname }));
            dispatch(setName({ prop: "lname", value: doctorInfo.lname }));
            dispatch(setDoctorProfilePic(doctorInfo.profile_pic_uri));

            setBackgroundPic(doctorInfo.background_img_uri )
            setUniversity(doctorInfo.university);
            setAbout(doctorInfo.about);
            setBlogs(doctorInfoRqust.data.doctor_blogs);
            setFollowers(doctorInfoRqust.data.followers);
            setFollowings(doctorInfoRqust.data.followings);

            setIsAccountOwner(doctorInfoRqust.data.isAccountOwner);
            setLoader(null);
         } catch (err) {
            if (err.response.data.message == "Unvalid token") {
               navigate("/sign-in");
            }
         }
      };
      getDoctorInfo();
   }, []);

   return (
      <>
         {loader}
         <Header />
         <main>
            <div className="profile_background" style={{backgroundImage: `url(${backgroundPic})`}}>
               <div className="background-info_wrapper">
                  <div className="empty_left_box"></div>
                  <div className="info-and-book_meeting">
                     <div className="doctor_info">
                        <h2>{bookMeeting.fname + " " + bookMeeting.lname}</h2>
                        <p className="university">{university}</p>
                     </div>

                     {!isAccountOwner && (
                        <div className="book-meeting">
                           <button onClick={() => dispatch(setBookMeetingPopup(<ScheduleMeeting doctor_id={doctor_id} />))}>Book a meeting</button>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            <div className="doctor-details">
               <div className="container">
                  <div className="card-container">
                     <div className="doctor-card">
                        <div className="profile_img">
                           <img src={bookMeeting.profile_pic ? bookMeeting.profile_pic : DefaultProfilePic} alt="profile picture" />
                           {!isAccountOwner && (
                              <div className="follow">
                                 <span>FOLLOW</span>
                                 <Heart />
                              </div>
                           )}
                        </div>

                        <div className="details_wrapper">
                           <div className="about">
                              <h4>ABOUT</h4>
                              <p>{about}</p>
                           </div>

                           <div className="followings">
                              <div className="followers">
                                 <p className="counter">{followers}</p>
                                 <p>FOLLOWERS</p>
                              </div>
                              <div className="posts">
                                 <p className="counter">{blogs.length}</p>
                                 <p>POSTS</p>
                              </div>
                              <div className="following">
                                 <p className="counter">{followings}</p>
                                 <p>FOLLOWINGS</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="posts">
                     <div className="heading">
                        <h3 className="posts_header">Posts</h3>
                        {isAccountOwner && (
                           <div className="profile_options">
                              <button className="edit-profile" title="Edit profile" onClick={() => dispatch(setEditProfilePopup(<EditProfile university={university} about={about} />))}>
                                 <Edit />
                              </button>
                              <button className="add-blog" onClick={() => dispatch(setAddBlogPopup(<AddBlogPopup />))}>
                                 <Plus /> <span>Add blog</span>
                              </button>
                           </div>
                        )}
                     </div>
                     <div className="posts_container">
                        {blogs &&
                           blogs.map((blog, index) => {
                              let date = new Date(blog.created_at);
                              return (
                                 <Post
                                    key={index}
                                    profilePic={bookMeeting.profile_pic ? bookMeeting.profile_pic : DefaultProfilePic}
                                    fullName={bookMeeting.fname + " " + bookMeeting.lname}
                                    content={blog.content}
                                    createdAt={`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`}
                                 />
                              );
                           })}
                     </div>
                  </div>
               </div>
            </div>

            {popupController.editProfilePopup}
            {popupController.addBlogPopup}
            {popupController.bookMeetingPopup}
         </main>
         <Footer />
      </>
   );
};

export default Profile;
