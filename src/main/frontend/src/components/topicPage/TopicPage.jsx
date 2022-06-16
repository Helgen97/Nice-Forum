import React from "react";
import { useParams } from "react-router-dom";
import CommentList from "./CommentList";
import MainComment from "./MainComment";

const TopicPage = () => {
  const topicId = useParams().topicID;

  return (
    <main className="topic-page">
      <MainComment topicId={topicId} />

      <CommentList topicId={topicId}/>
      
    </main>
  );
};

export default TopicPage;
