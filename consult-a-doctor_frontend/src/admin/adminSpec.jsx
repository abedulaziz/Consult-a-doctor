import React from 'react'

// icons
import {ReactComponent as Edit} from '../assets/icons/edit.svg';
import {ReactComponent as Trash} from '../assets/icons/red-trash.svg';

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
          <div className="icon_wrapper">
            <Edit />
            <div>Edit</div>
          </div>
        </div>
        <div className="delete">
          <div className="icon_wrapper">
            <Trash />
            <div>Delete</div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default AdminSpec