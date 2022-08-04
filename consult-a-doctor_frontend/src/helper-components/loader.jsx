import React from 'react'
import { Rings } from  'react-loader-spinner'

const Loader = () => {
  return (
    <div className='loader-background'>
      <div className="rings_wrapper">
        <Rings
          height = "150"
          width = "150"
          radius = "9"
          color = '#022e7a'
          ariaLabel = 'three-dots-loading'     
          wrapperStyle
          // wrapperClass
        />
      </div>
    </div>
  )
}

export default Loader