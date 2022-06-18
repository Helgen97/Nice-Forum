import React from "react";
import parser from 'bbcode-to-react'

const CommentText = ({ text = "" }) => {
  return (
    <div className="comment__content-text">
      {text.split("\n").map((t, index) => (
        <p key={index} className="comment__content-text__paragraph">{parser.toReact(t)}</p>
      ))}
    </div>
  );
};

export default CommentText;
