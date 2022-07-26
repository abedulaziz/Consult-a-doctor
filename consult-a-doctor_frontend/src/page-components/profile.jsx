import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import {useParams} from 'react-router-dom';

import axios from 'axios';

// layout components
import Header from '../layout-components/header';
import Footer from '../layout-components/footer';

// icons
import {ReactComponent as Heart} from '../assets/icons/heart.svg';

// layout components
import Post from '../layout-components/post';

const Profile = () => {
  const [fullname, setFullname] = useState("")
  const [university, setUniversity] = useState("")
  const [about, setAbout] = useState("")
  const [profilePic, setProfilePic] = useState(null)
  const [blogs, setBlogs] = useState([])
  const [followers, setFollowers] = useState(0)
  const [followings, setFollowings] = useState(0)

  let {doctor_id} = useParams();

  const userInfo = useSelector((state) => state.userInfo.value)

  React.useEffect(() => {
    const getDoctorInfo = async() => {
      const doctorInfoRqust = await axios.get(`users/${doctor_id}/doctor-info`)
      console.log(doctorInfoRqust);

      let doctorInfo = doctorInfoRqust.data.doctor_info

      setFullname(doctorInfo.fname + " "+ doctorInfo.lname)
      setUniversity(doctorInfo.university)
      setAbout(doctorInfo.about)
      setProfilePic(doctorInfo.profile_pic)
      setBlogs(doctorInfoRqust.data.doctor_blogs)
      setFollowers(doctorInfoRqust.data.followers)
      setFollowings(doctorInfoRqust.data.followings)

    }
    getDoctorInfo()
  }, [])

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

              <div className="book-meeting">
                <button>Book a meeting</button>
              </div>

            </div>

          </div>

        </div>

        <div className="doctor-details">
          <div className="container">

            <div className="card-container">
              <div className="doctor-card">

                <div className="profile_img">
                  <img src={profilePic} alt="profile picture" />
                  <div className="follow">
                    <span>FOLLOW</span>
                    <Heart />
                  </div>
                </div>

                <div className="details_wrapper">
                  <div className="about">
                    <h4>ABOUT</h4>
                    <p>{about}</p>
                  </div>

                  <div className="followings">
                    <div className="followers">
                      <p className='counter'>{followers}</p>
                      <p>FOLLOWERS</p>
                    </div>
                    <div className="posts">
                      <p className='counter'>{blogs.length}</p>
                      <p>POSTS</p>
                    </div>
                    <div className="following">
                      <p className='counter'>{followings}</p>
                      <p>FOLLOWINGS</p>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>

            <div className="posts">
              <h3 className="posts_header">Posts</h3>
              {blogs && blogs.map((blog, index)=> {
                let date = new Date(blog.created_at)
                return <Post key={index} profilePic={userInfo.profilePic} fullName={fullname} content={blog.content} createdAt={`${date.getFullYear()}/${date.getMonth()}/${date.getDay()}`} />
              })}
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Profile