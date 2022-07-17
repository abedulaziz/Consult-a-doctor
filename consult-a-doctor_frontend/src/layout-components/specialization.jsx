import React from 'react'

const Specialization = ({specName, img}) => {
  return (
    <div className='specialization'>
      <img src={img}/>
      <span>{ specName }</span>
      <div className="overlay"></div>
    </div>
  )
}

export default Specialization