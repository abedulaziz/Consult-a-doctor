import React from 'react'

const Post = ({profilePic, fullName, content, createdAt}) => {
  return (
    <div className='post'>
      <div className="heading">
        <div className="profile_pic">
          <img src={ profilePic } />
        </div>
        <div className="fullname">
          { fullName }
          <div className="created_at">
          {createdAt}
        </div>
        </div>

      </div>

      <div className="content">
        {content}
      </div>
      <div className="created_at">
  
      </div>
    </div>
  )
}

export default Post