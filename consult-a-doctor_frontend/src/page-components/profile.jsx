import React from 'react'

// layout components
import Header from '../layout-components/header';
import Footer from '../layout-components/footer';

// icons
import {ReactComponent as Heart} from '../assets/icons/heart.svg';

// layout components
import Post from '../layout-components/post';

// backgrounds
import Doctor1 from '../assets/backgrounds/doctor1.jpg'

const Profile = () => {
  return (
    <>
      <Header />
      <main>
        <div className="profile_background">

          <div className="background-info_wrapper">
            <div className="empty_left_box"></div>
            <div className="info-and-book_meeting">
              <div className="doctor_info">
                <h2>John Doe</h2>
                <p className="university">Heuston, Florida</p>
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
                  <img src={Doctor1} alt="" />
                  <div className="follow">
                    <span>FOLLOW</span>
                    <Heart />
                  </div>
                </div>

                <div className="details_wrapper">
                  <div className="about">
                    <h4>ABOUT</h4>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  </div>

                  <div className="followings">
                    <div className="followers">
                      <p className='counter'>33</p>
                      <p>FOLLOWERS</p>
                    </div>
                    <div className="posts">
                      <p className='counter'>52</p>
                      <p>POSTS</p>
                    </div>
                    <div className="following">
                      <p className='counter'>2</p>
                      <p>FOLLOWINGS</p>
                    </div>
                  </div>
                </div>
              
              </div>
            </div>

            <div className="posts">
              <h3 className="posts_header">Posts</h3>
              <Post profilePic={Doctor1} fullName="John Doe" />
              <Post profilePic={Doctor1} fullName="John Doe" />
              <Post profilePic={Doctor1} fullName="John Doe" />
              <Post profilePic={Doctor1} fullName="John Doe" />
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Profile