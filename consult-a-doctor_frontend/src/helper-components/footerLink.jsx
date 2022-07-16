import React from 'react'

import {Link} from 'react-router-dom';

const FooterLink = ({target, alt, text}) => {
  return (
    <li>
      <Link to={target} alt={alt} >{ text }</Link>
    </li>
  )
}

export default FooterLink