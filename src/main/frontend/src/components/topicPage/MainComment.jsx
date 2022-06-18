import React, { useEffect, useState } from "react";
import $ from "jquery";
import TopicService from "../../API/TopicService";
import { useFetching } from "../../hooks/useFetching";
import MainCommentHeader from "./MainCommentHeader";
import CommentCreator from "./CommentCreator";
import CommentText from "./CommentText";
import CommentTime from "./CommentTime";
import CommentEdit from "./CommentEdit";
import CommentEditButtons from "./CommentEditButtons";
import CommentFooter from "./CommentFooter";
import MetaTags from "../UI/meta/MetaTags";
import Error from "../UI/errorBanner/Error";
import Loader from "../UI/loader/Loader";
import { useAuth } from "../../context/Auth";

const MainComment = ({ topicId }) => {
  const maxTextLength = 600;
  const [topic, setTopic] = useState({});
  const [newTopicText, setNewTopicText] = useState("");
  const { isAuth } = useAuth();

  const [getTopic, isLoading, gettingTopicError] = useFetching(
    async (topicId) => {
      const topic = await TopicService.getById(topicId);
      setTopic(topic);
    }
  );

  const [updateTopic, isUpdating, updateTopicError] = useFetching(
    async (topicId, topic) => {
      const updatedTopic = await TopicService.updateTopic(topicId, topic);
      setTopic(updatedTopic);
    }
  );

  useEffect(() => {
    getTopic(topicId);
  }, []);

  function topic_edit() {
    setNewTopicText(topic.text);
    $("#topic_comment").addClass("edit");
  }

  function confirm() {
    if (newTopicText.length > maxTextLength) return;
    updateTopic(topicId, {
      title: topic.title,
      description: topic.description,
      text: newTopicText,
    });
    $("#topic_comment").removeClass("edit");
  }

  function decline() {
    $("#topic_comment").removeClass("edit");
  }

  function like(e) {
    if ($(e.target).hasClass("like-btn-active")) {
      $(e.target).removeClass("like-btn-active");
      TopicService.dislikeTopic(topicId);
      setTopic({ ...topic, likes: topic.likes - 1 });
    } else {
      $(e.target).addClass("like-btn-active");
      TopicService.likeTopic(topicId);
      setTopic({ ...topic, likes: topic.likes + 1 });
    }
  }

  function del() {
    if (window.confirm("Delete this topic?")) {
      TopicService.deleteTopic(topicId);
      window.location.replace("/section/" + topic.sectionId);
    }
  }

  if (isLoading || isUpdating) return <Loader />;

  if (gettingTopicError || updateTopicError)
    return <Error error={gettingTopicError || updateTopicError} />;

  return (
    <div className="topic" id="topic_comment">
      <MetaTags
        title={
          topic.title +
          " - " +
          topic.sectionTitle +
          " - Nice Forum - Forum of Nice Communication!"
        }
        description={topic.title + ". " + topic.description}
        keywords={"Forum, speaking, sections, friendship, news, " + topic.title}
      />
      <MainCommentHeader
        title={topic.title}
        sectionTitle={topic.sectionTitle}
        tags={topic.topicTags}
      />
      <div className="comment__content">
        <CommentCreator
          creatorNickName={topic.creatorNickName}
          creatorID={topic.creatorId}
          avatarUrl={topic.creatorAvatarUrl}
        />
        {isAuth && (
          <CommentEdit
            value={newTopicText}
            onChange={(e) => setNewTopicText(e.target.value)}
            id="topic_edit"
            maxTextLength={maxTextLength}
          />
        )}
        {isAuth && <CommentEditButtons confirm={confirm} decline={decline} />}
        <CommentText text={topic.text} />
        <CommentTime time={topic.date} />
      </div>
      <CommentFooter
        creatorID={topic.creatorId}
        edit={topic_edit}
        like={like}
        likesCount={topic.likes}
        del={del}
      />
    </div>
  );
};

export default MainComment;
