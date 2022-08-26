import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../helper-components/loader";

import { Trans } from "react-i18next";
import { t } from "i18next";
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
import DefaultProfilePic from "../assets/backgrounds/default_profile_picture.svg";
import Loupe from "../assets/icons/loupe.png";

// helper components
import AddBlogPopup from "../helper-components/addBlogPopup";

import { setPopupVisibility } from "../redux/slices/addBlogPopupSlice";
import { changePopupVisib, setName, setDoctorProfilePic } from "../redux/slices/bookMeetingSlice";
import { setEditProfilePopup, setAddBlogPopup, setBookMeetingPopup } from "../redux/slices/popupControllerSlice";

const Profile = () => {
   const [loader, setLoader] = useState(<Loader />);
   const dispatch = useDispatch();

   let navigate = useNavigate();
   const [doctorInfo, setDoctorInfo] = useState({});

   const bookMeeting = useSelector((state) => state.bookMeeting.value);
   const popupController = useSelector((state) => state.popupController.value);
   const { doctor_id } = useParams();

   React.useEffect(() => {
      const getDoctorInfo = async () => {
         try {
            const doctorInfoRqust = await axios.get(`users/${doctor_id}/doctor-info`, {
               headers: {
                  Authorization: `Bearer ${localStorage.getItem("JWT")}`,
               },
            });
            const doctorInfo = doctorInfoRqust.data.doctor_info;

            dispatch(setName({ prop: "fname", value: doctorInfo.fname }));
            dispatch(setName({ prop: "lname", value: doctorInfo.lname }));
            dispatch(setDoctorProfilePic(doctorInfo.profile_pic_uri));

            const info = {
               background_img_uri: doctorInfo.background_img_uri,
               university: doctorInfo.university,
               about: doctorInfo.about,
               blogs: doctorInfoRqust.data.doctor_blogs,
               followers: doctorInfoRqust.data.followers,
               followings: doctorInfoRqust.data.followings,
               doctor_blogs: doctorInfoRqust.data.doctor_blogs,
               isAccountOwner: doctorInfoRqust.data.isAccountOwner,
            };
            setDoctorInfo(info);
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
            <div className="profile_background" style={{ backgroundImage: `url(${doctorInfo.background_img_uri})` }}>
               <div className="background-info_wrapper">
                  <div className="empty_left_box"></div>
                  <div className="info-and-book_meeting">
                     <div className="doctor_info">
                        <h2>{bookMeeting.fname + " " + bookMeeting.lname}</h2>
                        <p className="university">{doctorInfo.university}</p>
                     </div>

                     {!doctorInfo.isAccountOwner && (
                        <div className="book-meeting">
                           <button onClick={() => dispatch(setBookMeetingPopup(<ScheduleMeeting doctor_id={doctor_id} />))}>
                              {t("lang.profile.background.book_meeting_but")}
                           </button>
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
                           {!doctorInfo.isAccountOwner && (
                              <div className="follow">
                                 <span>{t("lang.profile.doctor_card.follow_but")}</span>
                                 <Heart />
                              </div>
                           )}
                        </div>

                        <div className="details_wrapper">
                           <div className="about">
                              <h4>{t("lang.profile.doctor_card.about_word")}</h4>
                              <p>{doctorInfo.about}</p>
                           </div>

                           <div className="followings">
                              <div className="followers">
                                 <p className="counter">{doctorInfo.followers}</p>
                                 <p>{t("lang.profile.doctor_card.followers")}</p>
                              </div>
                              <div className="posts">
                                 <p className="counter">{doctorInfo.blogs && doctorInfo.blogs.length}</p>
                                 <p>{t("lang.profile.doctor_card.posts")}</p>
                              </div>
                              <div className="following">
                                 <p className="counter">{doctorInfo.followings}</p>
                                 <p>{t("lang.profile.doctor_card.followings")}</p>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="posts">
                     <div className="heading">
                        <h3 className="posts_header">{t("lang.profile.doctor_posts")}</h3>
                        {doctorInfo.isAccountOwner && (
                           <div className="profile_options">
                              <button
                                 className="edit-profile"
                                 title="Edit profile"
                                 onClick={() => dispatch(setEditProfilePopup(<EditProfile university={doctorInfo.university} about={doctorInfo.about} />))}
                              >
                                 <Edit />
                              </button>
                              <button className="add-blog" onClick={() => dispatch(setAddBlogPopup(<AddBlogPopup />))}>
                                 <span>{t("lang.profile.add_blog")}</span>
                                 <Plus />
                              </button>
                           </div>
                        )}
                     </div>
                     <div className="posts_container">
                        {doctorInfo.blogs?.length ? (
                           doctorInfo.blogs.map((blog, index) => {
                              let date = new Date(blog.created_at);
                              return (
                                 <Post
                                    key={index}
                                    profilePic={bookMeeting.profile_pic ? bookMeeting.profile_pic : DefaultProfilePic}
                                    fullName={bookMeeting.fname + " " + bookMeeting.lname}
                                    content={blog.content}
                                    createdAt={`${date.getFullYear()}/${date.getMonth() +1}/${date.getDate()}`}
                                 />
                              );
                           })
                        ) : (
                           <div className="no-posts">
                              <p>
                                 <img src={Loupe} />
                                 <p className="no-posts-mess">No posted blogs yet</p>
                              </p>
                           </div>
                        )}
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
