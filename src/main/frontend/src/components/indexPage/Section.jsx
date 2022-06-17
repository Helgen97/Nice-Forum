import React, { useEffect, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import TopicService from "../../API/TopicService";
import Topic from "../UI/topicComponent/Topic";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const Section = ({ section }) => {
  const topicsPerPage = 5;
  const [topicList, setTopicList] = useState([]);
  const [getTopicsPage, isLoading, gettingTopicsPageError] = useFetching(
    async () => {
      const topicsPage = await TopicService.getTopicsBySectionId(
        section.id,
        0,
        topicsPerPage
      );
      setTopicList(topicsPage.content);
    }
  );

  useEffect(() => {
    getTopicsPage();
  }, []);

  if (isLoading) return <Loader />;
  if (gettingTopicsPageError) return <Error error={gettingTopicsPageError} />;

  return (
    <div className="section">
      <div className="section__header">
        <p className="section__header-title">{section.title}</p>
        <p>{section.description}</p>
      </div>
      {topicList.map((topic) => (
        <Topic topic={topic} key={topic.id} />
      ))}
      <div className="section__btn-container">
        <a href={"/section/" + section.id} className="section__btn">To section...</a>
      </div>
    </div>
  );
};

export default Section;
