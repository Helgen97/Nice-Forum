import React from "react";

const CommentEdit = ({ value, onChange, id, maxTextLength}) => {
  return (
    <div className="comment__content-edit">
      <div>
        <p className="comment__content-edit__text-title">Edit</p>
      </div>
      <textarea
        id={id}
        className="comment-text-area"
        cols="30"
        rows="6"
        value={value}
        onChange={onChange}
      />
      <p className="textarea__chars-remain">{value.length > maxTextLength ? "Сharacter limit exceeded!" : "Characters left: " + (maxTextLength - value.length)}</p>
    </div>
  );
};

export default CommentEdit;
