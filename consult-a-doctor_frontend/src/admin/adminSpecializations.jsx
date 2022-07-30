import React from 'react'

import Sidebar from './layout/sidebar';
import Header from './layout/header';

// icons
import {ReactComponent as Plus} from '../assets/icons/plus.svg';



const AdminSpecializations = () => {
  return (

    <div className="admin_background">
      <Sidebar />
      <div className="container">

      <Header />

      <div className='adding_spec'>

        <div className="text">
          <h3>Add New Specialization</h3>
          <p>Specializations added here will be global and doctors can commit to.</p>
        </div>

        <div className="add_spec_icon">
          <Plus />
        </div>

      </div>

      <div className="content_table">
        <h3 className='table_header'>All specializations</h3>
        <table>
          <thead>
            <th>ID</th>
            <th>Specialization</th>
            <th>Doctors</th>
            <th>Created at</th>
            <th>Updated at</th>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Cardiology</td>
              <td>34</td>
              <td>03/22/2014</td>
              <td>02/01/2015</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Oncology</td>
              <td>22</td>
              <td>04/05/2018</td>
              <td>05/02/2011</td>
            </tr>
          </tbody>
        </table>

      </div>

      </div>
    </div>
  )
}

export default AdminSpecializations