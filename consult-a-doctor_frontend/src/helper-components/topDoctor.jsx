import React from 'react'

// icons
import Star from '../assets/icons/star.svg';

const TopDoctor = ({fullName, age, speciality, doctorImg, isActive=false}) => {
  return (
    <div className={"top_doctor " + (isActive && "active")}>
      <div className="img_wrapper">
        <img src={doctorImg} />
      </div>
      <div className="details">
        <div className="speciality-age">
          <div className="speciality">{speciality}</div>
          <div className="age">{age}</div>
        </div>

        <div className="name">{fullName}</div>
        <div className="rate">
          <img src={Star} />
          <img src={Star} />
          <img src={Star} />
          <img src={Star} />
          <img src={Star} />
        </div>
      </div>
    </div>
  )
}

export default TopDoctor