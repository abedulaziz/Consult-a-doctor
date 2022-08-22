import React from 'react'
import jwt_decode from 'jwt-decode'

// icons
import {ReactComponent as SearchIcon} from '../../assets/icons/admin_search.svg';
import {ReactComponent as AdminPic} from '../../assets/icons/admin_profile_picture.svg';

const Header = ({searchValue}) => {
  const decodedJWT = jwt_decode(localStorage.getItem('JWT'))
  const adminName = decodedJWT.fname + " " + decodedJWT.lname

  return (
    <div className='header'>

      <div className="head_container">
        <div className="options">

          <div className="search-box">
            <SearchIcon />
            <input id="search" onChange={(ev) => searchValue(ev.target.value)} type="text" placeholder="Search" />

          </div>

        </div>
        <div className="profile_info">

          <p className="admin_name">{adminName}</p>
          <div className="profile_pic_wrapper">
            <AdminPic />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Header