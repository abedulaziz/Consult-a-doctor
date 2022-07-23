import React from 'react'
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className='admin_panel_head'>

      <div className="container">
        <div className="admin_spec">
          <NavLink to="/admin/specializations">
            <div className="spec_link">
              Specializations
            </div>
          </NavLink>
        </div>

        <div className="doctor_requests">
          <NavLink to="/admin/doctor_requests">
            <div className="doctor_req_link">
              Doctor requests
            </div>
          </NavLink>
        </div>
      </div>

    </header>
  )
}

export default Header 