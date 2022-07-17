import React from 'react'

import {NavLink} from 'react-router-dom';

const Navitem = ({path, className, content}) => {
  return (
    <NavLink to={path}>
      <div className={className}>
          {content}
      </div>
    </NavLink>
  )
}

export default Navitem