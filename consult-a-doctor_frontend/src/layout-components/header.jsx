import React from 'react'

// helper components
import NavItem from '../helper-components/navItem';

import logo from '../assets/brand/transparent_background_brand.png';

const Header = () => {
  return (
    <header>

      <div className='container'>
        <div className='header-content'>

          <div className="brand">
            <div className="logo">
              <img src={logo} alt="consult a doctor" />
            </div>
          </div>

          <nav>

            <NavItem path="/" className="home" content="Home" />
            <NavItem path="/specializations" className="specializations" content="Specializations" />
            <NavItem path="/doctors" className="doctors" content="Doctors" />
            <NavItem path="/appointments" className="appointments" content="My Appointments" />

          </nav>

          <div className="account_status">
            <button className='sign-in_button'>Sign in</button>
            <button className='sign-up_button'>Sign up</button>
          </div>
        
        </div>
      </div>

    </header>
  )
}

export default Header