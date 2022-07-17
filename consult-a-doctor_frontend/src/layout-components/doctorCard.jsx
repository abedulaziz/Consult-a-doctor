import React from 'react'

import {Link} from 'react-router-dom';

// icons
import {ReactComponent as Star} from '../assets/icons/star.svg';
import {ReactComponent as PersonCheck} from '../assets/icons/PersonCheck.svg';

const DoctorCard = ({profile_pic, fullname, followers}) => {
  return (
    <div className='card'>

      <div className="img_wrapper">
        <img src={ profile_pic } />
      </div>

      <div className="doctor-info">
        <h4 className="fullname">{ fullname }</h4>
        <div className="rate">
          <Star />
          <Star />
          <Star />
          <Star />
          <Star />
        </div>
        <div className="followers">
          <PersonCheck />
          followers: { followers }
        </div>

        <div className="profile_link">
          <Link to="/profile">Go to profile</Link>
        </div>
      </div>

    </div>
  )
}

export default DoctorCard