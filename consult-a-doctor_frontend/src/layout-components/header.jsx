import React from 'react';
import {Link} from 'react-router-dom';

// helper components
import NavItem from '../helper-components/navItem';

// icons
import {ReactComponent as Menu} from '../assets/icons/menu.svg';

import logo from '../assets/brand/transparent_background_brand.png';

const Header = () => {
  const header = React.useRef(null);
  const NavBar = React.useRef(null);

  window.addEventListener("scroll", () => {

    if (window.pageYOffset > 0) {
      header.current.style.padding = "15px 0"
      header.current.style.backgroundColor = "var(--light-text-color)"
    }
    else {
      header.current.style.padding = "20px 0"
      header.current.style.backgroundColor = "transparent"
    }
  });

  const displayNav = () => {
    let currDisplay = NavBar.current.style.display
    
    if (currDisplay === "none" || currDisplay === "") {
      NavBar.current.style.display = "block"
    }
    else NavBar.current.style.display = "none"
  }

  return (
    <header ref={header}>

      <div className='container'>
        <div className='header-content'>

          <div className="brand">
            <div className="logo">
              <img src={logo} alt="consult a doctor" />
            </div>
          </div>

          <nav ref={NavBar}>

            <NavItem path="/" className="home-link" content="Home" />
            <NavItem path="/doctor/specializations" className="specializations-link" content="Specializations" />
            <NavItem path="/doctor/accounts" className="doctors-link" content="Doctors" />
            <NavItem path="/my-appointments-link" className="appointments" content="My Appointments" />

          </nav>

          <div className="account_status">
            <Link to="/sign-in"><button className='sign-in_button'>Sign in</button></Link>
            <Link to="/sign-up"><button className='sign-up_button'>Sign up</button></Link>
            <div className="menu">
              <Menu onClick={() => displayNav()} />
            </div>
          </div>
        
        </div>
      </div>


    </header>
  )
}

export default Header