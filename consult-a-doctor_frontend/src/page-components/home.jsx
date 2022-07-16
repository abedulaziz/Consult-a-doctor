import React from 'react'

// icons
import CheckTwoSqure from '../assets/icons/CheckTwoSquare.svg';
import PersonVideo from '../assets/icons/PersonVideo.svg';
import Development from '../assets/icons/Development.svg';
import HandsThumbsUp from '../assets/icons/HandThumbsUp.svg';

// backgrounds
import DoctorsSupportImg from '../assets/backgrounds/doctors_support.png';

// helper components
import Meta from '../helper-components/meta';
import Feature from '../helper-components/feature';

// layout components
import Header from '../layout-components/header';

const Home = () => {
  return (
    <div>
      <Meta />

      <Header />
      <main>

        {/* hero section */}
        <div className="hero">
          <div className="container">
            <div className="hero-content">

              <div className="heading">
                <h1>Reach our doctors <span className='theme-colored'>now!</span></h1>
                <p>Join our community and book a meeting with one of our doctors and discuss your issue.</p>
              </div>

              <ul className="hero_features">
                <li><img src={CheckTwoSqure} /><p>Secret and safe consultants</p></li>
                <li><img src={CheckTwoSqure} /><p>Experienced doctors</p></li>
                <li><img src={CheckTwoSqure} /><p>Low cost meetings</p></li>
              </ul>

            </div>
          </div>
        </div>

        {/* features section */}
        <div className="features">
          <div className="container">
            <div className="features-content">

              <Feature 
                icon={PersonVideo} 
                header="Online Consultants"
                description="Book a meeting with your doctor and make an online video chat."
              />
              <Feature 
                icon={Development} 
                header="Doctor Development"
                description="If you are a doctor, you will benefit from the experiences gained from patients in addition to benefiting materially."
              />
              <Feature 
                icon={HandsThumbsUp} 
                header="Follow Doctors"
                description="Follow doctors accounts where they do share their experiences and thoughts in their field."
              />

            </div>
          </div>
        </div>

        {/* doctor support section */}
        <div className="doctor_supp">
          <div className="container">
            <div className="supp-content">

              <div className="side_img">
                <img src={DoctorsSupportImg} />
              </div>

              <div className="supp_text">
                <h2 className="heading">Doctor support</h2>
                <p className="description">
                You can find doctors from different nationalities and specialties in our community!<br />
                During your walkthrough, you can search and book meetings with doctors as much as you want.<br />
                All doctors here are available and always ready to help.<br />
                </p>
              </div>

            </div>
          </div>
        </div>

      </main>
    </div>
  )
}

export default Home