import React, { useEffect, useState } from "react";
import $ from "jquery";
import CommentService from "../../API/CommentService";
import { useFetching } from "../../hooks/useFetching";
import CommentCreator from "./CommentCreator";
import NewCommentContent from "./NewCommentContent";
import Error from "../UI/errorBanner/Error";
import Loader from "../UI/loader/Loader";

const NewComment = ({ topicId, addNewComment }) => {
  const [newCommentText, setNewCommentText] = useState("");
  const [currentUser, setCurrentUser] = useState({ nickname: "" });
  const maxTextLength = 300;

  const [createComment, isCreating, error] = useFetching(async (comment) => {
    CommentService.createComment(comment).then((result) => {
      addNewComment(result);
    });
  });

  useEffect(() => {
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  function create() {
    if(newCommentText.length > maxTextLength) return;
    createComment({
      text: newCommentText,
      commentTopic: {
        id: topicId,
      },
    });
    $(".new__comment").fadeOut();
    setNewCommentText("");
  }

  if (error) return <Error error={error} />;

  if (isCreating) return <Loader />;

  return (
    <div className="new__comment">
      <div>
        <div className="comment__content">
          <CommentCreator creatorNickName={currentUser.nickname} />
          <NewCommentContent
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            maxTextLength={maxTextLength}
          />
        </div>
        <div className="comment__footer">
          <button className="comment__btn" onClick={create}>
            Ответить
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewComment;
