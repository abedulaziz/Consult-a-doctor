import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios';

// helper components
import NavItem from '../helper-components/navItem';

// backgrounds
import Doctor1 from '../assets/backgrounds/doctor1.jpg';

// icons
import {ReactComponent as Menu} from '../assets/icons/menu.svg';

import Logo from '../assets/brand/transparent_background_brand.png';
import MobileLogo from '../assets/brand/transparent_background_logo.png';

const Header = () => {
  const header = React.useRef(null);
  const NavBar = React.useRef(null);
  const [userProfileWidget, setUserProfileWidget] = React.useState(null)
  const navigate = useNavigate()

  const userInfo = useSelector((state) => state.userInfo.value)

  const [logo, setLogo] = React.useState(MobileLogo)

  React.useEffect(() => {
    window.screen.width < 590 ? setLogo(MobileLogo) : setLogo(Logo)

  }, [])

  window.addEventListener("scroll", () => {

    if (window.pageYOffset > 0) {

      if (header.current !== null) {
        header.current.style.padding = "15px 0"
        header.current.style.backgroundColor = "var(--light-text-color)"
      }
    }
    else {
      if (header.current !== null) {
        header.current.style.padding = "20px 0"
        header.current.style.backgroundColor = "transparent"
      }
    }
  });

  const displayNav = () => {
    let currDisplay = NavBar.current.style.display
    
    if (currDisplay === "none" || currDisplay === "") {
      NavBar.current.style.display = "block"
    }
    else NavBar.current.style.display = "none"
  }

  const getProfileInfo = async() => {

    try {
      const userInfoRqust = await axios.get(`users/${userInfo.user_id}/user-info`, {
        headers: {
          Authorization: `Bearer ${userInfo.JWT}`
        }
      })

      console.log(userInfoRqust)
      const info = userInfoRqust.data.user_info

      if (info.type === "doctor") {
        navigate(`/doctor/${userInfo.user_id}/profile`)
      }
      else {
        if (!userProfileWidget)
        setUserProfileWidget(
          <div className="profile-widget">
            <div className="profile-img_wrapper">
              <img src={userInfo.profile_pic} />
            </div>

            <div className="first_name">
              First name: {info.fname}
            </div>
            <div className="last_name">
              Last name: {info.lname}
            </div>
            <div className="email">
              Email: {info.email}
            </div>
            <div className="age">
              Age: {new Date().getFullYear() - new Date(info.date_of_birth).getFullYear()} years old
            </div>
          </div>
        )
        else setUserProfileWidget(null)
      }


    } catch (err) {
      
    }
  }

  return (
    <header className='page_heading' ref={header}>

      <div className='container'>
        <div className='header-content'>

          <div className="brand">
            <div className="logo">
              <img src={ logo } alt="consult a doctor" />
            </div>
          </div>
          
          <nav ref={NavBar}>

            <div className="nav-wrapper">

              <NavItem path="/" className="home-link" content="Home" />
              <NavItem path="/doctor/specializations" className="specializations-link" content="Specializations" />
              <NavItem path="/doctor/all/accounts" className="doctors-link" content="Doctors" />
              <NavItem path={ userInfo.user_id ? `/${userInfo.user_id}/appointments` : "/sign-in"} className="appointments-link" content="My Appointments" />

            </div>

          </nav>

          <div className="account_status">

          {userInfo.JWT ? 
          <>
            <div className='profile-pic' onClick={() => getProfileInfo()}>
              <div className="pic_wrapper">
                <img src={userInfo.profile_pic} alt="profile" />
              </div>
            </div>
            <div className="menu">
              <Menu onClick={() => displayNav()} />
            </div>
            {userProfileWidget}
          </>
          :
          <>
            <Link to="/sign-in"><button className='sign-in_button'>Sign in</button></Link>
            <Link to="/sign-up"><button className='sign-up_button'>Sign up</button></Link>
            <div className="menu">
              <Menu onClick={() => displayNav()} />
            </div>
          </>
          }
          </div>
        
        </div>
      </div>


    </header>
  )
}

export default Header