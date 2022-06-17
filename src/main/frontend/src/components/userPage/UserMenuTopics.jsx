import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicService from "../../API/TopicService";
import { useFetching } from "../../hooks/useFetching";
import UserTopic from "./UserTopic";
import Error from "../UI/errorBanner/Error";
import Loader from "../UI/loader/Loader";

const UserMenuTopics = ({ userId, nickname }) => {
  const navigate = useNavigate();

  const topicsPerPage = 4;
  const [userTopics, setUserTopics] = useState([]);
  const [getUserTopicsPage, isLoading, gettingUserTopicsPageError] = useFetching(
    async (userId) => {
      const topicsPage = await TopicService.getTopicsByUserId(
        userId,
        0,
        topicsPerPage
      );
      setUserTopics(topicsPage.content);
    }
  );

  useEffect(() => {
    getUserTopicsPage(userId);
  }, [userId]);

  function click() {
    navigate("/search?author=" + nickname);
  }

  if (isLoading) return <Loader />;
  if (gettingUserTopicsPageError) return <Error error={gettingUserTopicsPageError} />;

  return (
    <div className="user-topics">
      <div className="user-content__head">
        <h2>Created topics</h2>
      </div>

      {userTopics.map((topic) => (
        <UserTopic topic={topic} key={topic.id} />
      ))}

      <div className="user-content__btn">
        <button
          className="btn"
          onClick={click}
        >
          More {nickname} topics
        </button>
      </div>
    </div>
  );
};

export default UserMenuTopics;
