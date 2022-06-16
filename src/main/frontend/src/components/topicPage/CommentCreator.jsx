import React from "react";
import Avatar from "../../img/avatar.svg";

const CommentCreator = ({ creatorNickName, creatorID }) => {
  return (
    <div className="comment__content-user_panel">
      <div className="comment__content-username">
        {creatorID !== 0 ? (
          <a href={"/user/" + creatorID}>
            <span>{creatorNickName}</span>
          </a>
        ) : (
          <span>{creatorNickName}</span>
        )}
      </div>
      <div>
        <img src={Avatar} alt={creatorNickName} />
      </div>
    </div>
  );
};

export default CommentCreator;
