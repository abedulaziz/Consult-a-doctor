import React from 'react'

import {NavLink} from 'react-router-dom';

const Navitem = ({path, className, content}) => {
  return (
    <div className={className}>
      <NavLink to={path}>{content}</NavLink>
    </div>
  )
}

export default Navitem