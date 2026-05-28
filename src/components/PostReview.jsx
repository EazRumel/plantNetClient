import React from 'react';
import { useState } from 'react';

const PostReview = () => {

  const [rating,setRating] = useState(0);
  return (
    <div>
        <label className="flex justify-center">
          <input className="border-amber-400" type="text" height={750} width={150}/>
        </label>
    </div>
  );
};

export default PostReview;