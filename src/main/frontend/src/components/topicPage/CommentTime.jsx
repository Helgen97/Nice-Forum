import React from "react";

const CommentTime = ({ time }) => {
  return (
    <div className="comment__content-time">
      <span>{time}</span>
    </div>
  );
};

export default CommentTime;
