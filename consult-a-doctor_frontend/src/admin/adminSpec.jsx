import React from 'react'

// icons
import Edit from '../assets/icons/edit.svg';
import Trash from '../assets/icons/trash-2.svg';

const AdminSpec = ({img, specName}) => {
  return (
    <div className='spec'>
      <div className="img_wrapper">

        <img src={img}/>
        <span>{ specName }</span>
        <div className="overlay"></div>

      </div>
      <div className="options">

        <div className="edit">
          <img src={Edit} alt="edit" />
          <span>Edit</span>
        </div>
        <div className="delete">
          <img src={Trash} alt="delete" />
          <span>Delete</span>
        </div>

      </div>
    </div>
  )
}

export default AdminSpec