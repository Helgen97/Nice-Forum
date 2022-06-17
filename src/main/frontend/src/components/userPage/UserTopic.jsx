import React from "react";

const UserTopic = ({ topic = {} }) => {
  return (
    <div className="user-content__panel">
      <div className="user-content__panel-block">
        <a href={"/topic/" + topic.id} className="user-content__panel-block__link">
          <p className="user-content__panel-title">{topic.title}</p>
          <p className="user-content__panel-description">{topic.desctiption}</p>
        </a>
      </div>
      <div className="user-content__panel-block">
        <p className="user-content__panel-title">Comments</p>
        <p className="user-content__panel-description">
          {topic.commentsAmount}
        </p>
      </div>
    </div>
  );
};

export default UserTopic;
