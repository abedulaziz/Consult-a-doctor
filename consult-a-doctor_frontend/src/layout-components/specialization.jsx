import React from 'react'

const Specialization = ({onClick, specName, img}) => {
  return (
    <div className='specialization' onClick={onClick}>
      <img src={img}/>
      <span>{ specName }</span>
      <div className="overlay"></div>
    </div>
  )
}

export default Specialization