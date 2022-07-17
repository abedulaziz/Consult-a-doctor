import React from 'react'

const Post = ({profilePic, fullName}) => {
  return (
    <div className='post'>
      <div className="heading">
        <div className="profile_pic">
          <img src={ profilePic } />
        </div>
        <div className="fullname">{ fullName }</div>
      </div>

      <div className="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat tempora similique nihil itaque harum earum dolor cupiditate iusto hic assumenda provident nostrum quibusdam, delectus laboriosam recusandae quasi vel asperiores sed.
      </div>
    </div>
  )
}

export default Post