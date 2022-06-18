import React from "react";
import Avatar from "../../img/avatar.svg";

const CommentCreator = ({ creatorNickName, creatorID, avatarUrl}) => {
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
        <img src={avatarUrl && avatarUrl !== "Default" ? avatarUrl : Avatar} alt={creatorNickName} className="comment__content-avatar"/>
      </div>
    </div>
  );
};

export default CommentCreator;
