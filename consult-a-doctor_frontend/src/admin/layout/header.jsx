import React from 'react'

// icons
import {ReactComponent as SearchIcon} from '../../assets/icons/admin_search.svg';

const Header = () => {
  return (
    <div className='header'>

      <div className="head_container">
        <div className="options">

          <div className="search-box">
            <SearchIcon />
            <input type="text" name="search" id="search" placeholder='Search' />
            {/* <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder="Search" /> */}

          </div>

        </div>
        <div className="profile_info">

          <p className="admin_name">John Doe</p>
          <div className="profile_pic_wrapper">
            <img src="" alt="" />
          </div>

        </div>

      </div>
    </div>
  )
}

export default Header