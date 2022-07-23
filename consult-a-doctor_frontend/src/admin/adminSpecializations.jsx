import React from 'react'

import Header from './header';
import AdminSpec from './adminSpec';


const AdminSpecializations = () => {
  return (
    <div className='admin_spec'>
      <Header />

      <div className="container">

      <div className="spec_addition">

      </div>

        <div className="spec_content">
          <AdminSpec />
          <AdminSpec />
          <AdminSpec />

        </div>

      </div>

    </div>
  )
}

export default AdminSpecializations