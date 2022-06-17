import React from "react";

const Topic = ({ topic }) => {
  return (
    <div className="section__topic">
      <div className="section__topic-column">
        <a href={"/topic/" + topic.id} className="section__topic-column__link">
          <p className="section__topic-column__title">{topic.title}</p>
          <p className="section__topic-column__description">
            {topic.description}
          </p>
        </a>
      </div>
      <div className="section__topic-column">
        <p className="section__topic-column__title">Comments</p>
        <p className="section__topic-column__description">
          {topic.commentsAmount}
        </p>
      </div>
      <div className="section__topic-column">
        <p className="section__topic-column__title">Author</p>
        {topic.creatorId !== 0 ? (
          <a
            href={"/user/" + topic.creatorId}
            className="section__topic-column__description"
          >
            {topic.creatorNickName}
          </a>
        ) : (
          <span className="section__topic-column__description">
            {topic.creatorNickName}
          </span>
        )}
      </div>
    </div>
  );
};

export default Topic;
