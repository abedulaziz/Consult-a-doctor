import React from "react";

const Post = ({ profilePic, fullName, content, createdAt }) => {
   return (
      <div className="post">
         <div className="heading">
            <div className="profile_pic">
               <img src={profilePic} />
            </div>
            <div className="fullname">
               {fullName}
               <div className="created_at">{createdAt}</div>
            </div>
         </div>

         <div className="content" dangerouslySetInnerHTML={{ __html: content }}></div>
      </div>
   );
};

export default Post;
