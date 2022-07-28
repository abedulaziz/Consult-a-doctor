import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import axios from "axios";

// layout components
import Header from "../layout-components/header";
import Footer from "../layout-components/footer";
import Post from "../layout-components/post";
import ScheduleMeeting from "../layout-components/scheduleMeeting";

// icons
import { ReactComponent as Heart } from "../assets/icons/heart.svg";
import { ReactComponent as Plus } from "../assets/icons/plus.svg";

// helper components
import AddBlogPopup from "../helper-components/addBlogPopup";

import { setPopupVisibility } from "../redux/slices/addBlogPopupSlice";

const Profile = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  const [fullname, setFullname] = useState("");
  const [university, setUniversity] = useState("");
  const [about, setAbout] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [followers, setFollowers] = useState(0);
  const [followings, setFollowings] = useState(0);

  const [isAccountOwner, setIsAccountOwner] = useState(false);

  const userInfo = useSelector((state) => state.userInfo.value);
  const { doctor_id } = useParams();

  React.useEffect(() => {
    // !userInfo.JWT && navigate("/sign-in")
    // if (!userInfo.JWT) {
    //   return navigate("/sign-in")
    // }

    try {
      const getDoctorInfo = async () => {
        const doctorInfoRqust = await axios.get(`users/${doctor_id}/doctor-info`, {
          headers: {
            Authorization: `Bearer ${userInfo.JWT}`,
          },
        });
        console.log(doctorInfoRqust.data);

        const doctorInfo = doctorInfoRqust.data.doctor_info;

        setFullname(doctorInfo.fname + " " + doctorInfo.lname);
        setUniversity(doctorInfo.university);
        setAbout(doctorInfo.about);
        setProfilePic(doctorInfo.profile_pic);
        setBlogs(doctorInfoRqust.data.doctor_blogs);
        setFollowers(doctorInfoRqust.data.followers);
        setFollowings(doctorInfoRqust.data.followings);

        setIsAccountOwner(doctorInfoRqust.data.isAccountOwner);
      };
      getDoctorInfo();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <div className="profile_background">
          <div className="background-info_wrapper">
            <div className="empty_left_box"></div>
            <div className="info-and-book_meeting">
              <div className="doctor_info">
                <h2>{fullname}</h2>
                <p className="university">{university}</p>
              </div>

              {!isAccountOwner && (
                <div className="book-meeting">
                  <button>Book a meeting</button>
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
                  <img src={profilePic} alt="profile picture" />
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
                  <button className="add-blog" onClick={() => dispatch(setPopupVisibility("is-visible"))}>
                    <Plus /> <span>Add blog</span>
                  </button>
                )}
              </div>
              <div className="posts_container">
                {blogs &&
                  blogs.map((blog, index) => {
                    let date = new Date(blog.created_at);
                    return (
                      <Post
                        key={index}
                        profilePic={userInfo.profilePic}
                        fullName={fullname}
                        content={blog.content}
                        createdAt={`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`}
                      />
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
        {isAccountOwner && <AddBlogPopup />}
        {!isAccountOwner && <ScheduleMeeting />}
      </main>
      <Footer />
    </>
  );
};

export default Profile;
