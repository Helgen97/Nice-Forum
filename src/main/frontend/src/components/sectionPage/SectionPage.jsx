import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import { useObserver } from "../../hooks/useObserver";
import SectionService from "../../API/SectionService";
import TopicService from "../../API/TopicService";
import SectionHeader from "./SectionHeader";
import Topic from "../UI/topicComponent/Topic";
import Loader from "../UI/loader/Loader";
import MetaTags from "../UI/meta/MetaTags";
import Error from "../UI/errorBanner/Error";

const SectionPage = () => {
  const sectionID = useParams().sectionID;
  const lastElement = useRef();

  const topicsPerPage = 10;

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [section, setSection] = useState({
    id: 0,
    title: "",
    description: "",
  });
  const [topicList, setTopicList] = useState([]);

  const [getSection, isSectionLoading, gettingSectionsError] = useFetching(
    async (sectionID) => {
      const section = await SectionService.getOne(sectionID);
      setSection(section);
    }
  );

  const [getTopicsPage, isTopicsPageLoading, gettingTopicsPageError] =
    useFetching(async (sectionID, page) => {
      const topicsPage = await TopicService.getTopicsBySectionId(
        sectionID,
        page,
        topicsPerPage
      );
      setTopicList([...topicList, ...topicsPage.content]);
      setTotalPages(topicsPage.totalPages);
    });

  useObserver(lastElement, page < totalPages, isTopicsPageLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    getSection(sectionID);
  }, [sectionID]);

  useEffect(() => {
    getTopicsPage(sectionID, page);
  }, [page]);

  if (isSectionLoading) return <Loader />;
  if (gettingSectionsError) return <Error error={gettingSectionsError} />;

  return (
    <main className="main-page section-page">
      <MetaTags
        title={
          section.title + " - Section - Nice Forum - Forum of Nice Communication!"
        }
        description={
          "All topics of '" + section.title + "' section. " + section.description
        }
        keywords={
          "Forum, speaking, sections, friendship, news, section topics, section"
        }
      />

      <SectionHeader title={section.title} description={section.description} />
      {topicList.map((topic) => (
        <Topic topic={topic} key={topic.id} />
      ))}
      {isTopicsPageLoading && <Loader />}
      {gettingTopicsPageError && <Error error={gettingTopicsPageError} />}
      <div ref={lastElement}></div>
    </main>
  );
};

export default SectionPage;
