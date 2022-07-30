import React from 'react'

import {NavLink} from 'react-router-dom';

const Navitem = ({path, className, content, icon}) => {
  return (
    <NavLink to={path}>
      <div className={className}>
        {icon}
        <p>{content}</p>
      </div>
    </NavLink>
  )
}

export default Navitem