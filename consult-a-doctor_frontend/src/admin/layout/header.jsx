import React from 'react'

// icons
import {ReactComponent as SearchIcon} from '../../assets/icons/search.svg';

const Header = () => {
  return (
    <div className='header'>
      <div className="options">

        <div className="search-box">
          <SearchIcon />
          {/* <input onChange={(ev) => setSearchValue(ev.target.value)} type="text" placeholder="Search" /> */}
          
        </div>

      </div>
      <div className="profile_info">

        <p className="admin_name">John Doe</p>
        <img src="" alt="" />

      </div>
    </div>
  )
}

export default Header