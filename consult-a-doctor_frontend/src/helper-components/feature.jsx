import React from 'react'


const Feature = ({icon, header, description}) => {
  return (
    <div className='feature'>
      <img src={ icon } />
      <h3 className='feature_head'>{ header }</h3>
      <p className='description'>{ description }</p>
    </div>
  )
}

export default Feature  