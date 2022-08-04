import React from 'react'

import {ReactComponent as ChevronRight} from '../assets/icons/chevrons-right.svg';

const TimeDuration = ({from, to}) => {
  return (
    <li>
      <span className="from">{from}</span>
      <ChevronRight />
      <span className="to">{to}</span>
    </li>
  )
}

export default TimeDuration