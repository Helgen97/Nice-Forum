import React from "react";

const CommentEditButtons = ({ confirm, decline }) => {
  return (
    <div className="comment__content-edit-btn">
      <div>
        <button className="confirm-btn" onClick={confirm} />
      </div>
      <div>
        <button className="decline-btn" onClick={decline} />
      </div>
    </div>
  );
};

export default CommentEditButtons;
