import React from "react";

const CommentText = ({ text = "" }) => {
  return (
    <div className="comment__content-text">
      {text.split("\n").map((t, index) => (
        <p key={index} className="comment__content-text__paragraph">{t}</p>
      ))}
    </div>
  );
};

export default CommentText;
