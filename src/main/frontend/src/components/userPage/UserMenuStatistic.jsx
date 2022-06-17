import React from "react";
import redHeart from "../../img/icons/heart-red.svg";

const UserMenuStatistic = ({ createdTopicCount, commentsCount, likes }) => {
  return (
    <div className="user-menu__statistic">
      <div className="user-menu__statistic-title">
        <h3>Statistics</h3>
      </div>
      <div className="user-menu__statistic-info">
        <div>
          <p className="user-menu__statistic-info__title">
            Topics created: <span>{createdTopicCount}</span>
          </p>
        </div>
        <div>
          <p className="user-menu__statistic-info__title">
            Comments: <span>{commentsCount}</span>
          </p>
        </div>
        <div>
          <img src={redHeart} alt="Red Heart" />
          <p className="user-menu__statistic-info__title">
            received: <span>{likes}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserMenuStatistic;
