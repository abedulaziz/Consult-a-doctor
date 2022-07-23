import React from 'react'

const Header = () => {
  return (
    <header className='admin_panel_head'>

      <div className="container">
        <div className="admin_spec">
          <div className="admin_spec_link">
            Specializations
          </div>
        </div>

        <div className="doctor_requests">
          <div className="doctor_req_link">
            Doctor requests
          </div>
        </div>
      </div>

    </header>
  )
}

export default Header 