import React from "react";

const SearchResultTopic = ({ topic }) => {
  return (
    <div className="search__result-topic">
      <div className="search__result-topic__title">
        <a href={"/topic/" + topic.id}>
          <p className="search__result-topic__title-name">{topic.title}</p>
          <p className="search__result-topic__title-description">
            {topic.description}
          </p>
        </a>
      </div>
      <div className="search__result-topic__content">
        <div className="search__result-topic__content-info">
          <p className="content-info__text">
            Comments:<span className="content-info__inner-text">{topic.commentsAmount}</span>
          </p>
        </div>
        <div className="search__result-topic__content-info">
          <a href={"/user/" + topic.creatorId}>
            <p className="content-info__text">
              Author:<span className="content-info__inner-text">{topic.creatorNickName}</span>
            </p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SearchResultTopic;
