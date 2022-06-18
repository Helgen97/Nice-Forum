import React, { useState } from "react";
import $ from "jquery";
import { useFetching } from "../../hooks/useFetching";
import CommentService from "../../API/CommentService";
import CommentCreator from "./CommentCreator";
import CommentEdit from "./CommentEdit";
import CommentEditButtons from "./CommentEditButtons";
import CommentText from "./CommentText";
import CommentTime from "./CommentTime";
import CommentFooter from "./CommentFooter";
import Error from "../UI/errorBanner/Error";
import Loader from "../UI/loader/Loader";

const TopicComment = ({ comment, index, removeComment, isAuth }) => {
  const anchor = "comment_" + (index + 1);
  const editAreaId = anchor + "_edit";
  const maxTextLength = 300;

  const [newCommentText, setNewCommentText] = useState("");

  const [currentComment, setCurrentComment] = useState(comment);

  const [updateComment, isUpdating, isUpdatingError] = useFetching(
    async (comment, commentId) => {
      const updatedComment = await CommentService.updateComment(
        comment,
        commentId
      );
      setCurrentComment(updatedComment);
    }
  );

  function commentEdit() {
    setNewCommentText(comment.text);
    $("#" + anchor).addClass("edit");
  }

  function confirmEdit() {
    if(newCommentText.length > maxTextLength) return;
    updateComment(
      {
        text: newCommentText,
      },
      comment.id
    );
    $("#" + anchor).removeClass("edit");
  }

  function declineEdit() {
    $("#" + anchor).removeClass("edit");
  }

  function like(e) {
    if ($(e.target).hasClass("like-btn-active")) {
      $(e.target).removeClass("like-btn-active");
      CommentService.dislikeComment(comment.id);
      setCurrentComment({ ...currentComment, likes: currentComment.likes - 1 });
    } else {
      $(e.target).addClass("like-btn-active");
      CommentService.likeComment(comment.id);
      setCurrentComment({ ...currentComment, likes: currentComment.likes + 1 });
    }
  }

  function del() {
    if (window.confirm("Delete comment?")) {
      removeComment(comment);
      CommentService.deleteComment(currentComment.id);
    }
  }

  if (isUpdatingError) return <Error error={isUpdatingError} />;
  if (isUpdating) return <Loader />;

  return (
    <div id={anchor} className="comment">
      <div className="comment__content">
        <CommentCreator
          creatorNickName={currentComment.creatorNickName}
          creatorID={currentComment.creatorId}
          avatarUrl={currentComment.creatorAvatarUrl}
        />
        {isAuth && (
          <CommentEdit
            value={newCommentText}
            onChange={(e) => setNewCommentText(e.target.value)}
            id={editAreaId}
            maxTextLength={maxTextLength}
          />
        )}
        {isAuth && (
          <CommentEditButtons confirm={confirmEdit} decline={declineEdit} />
        )}
        <CommentText text={currentComment.text} />
        <CommentTime time={currentComment.dateCreation} />
      </div>

      <CommentFooter
        creatorID={currentComment.creatorId}
        like={like}
        likesCount={currentComment.likes}
        edit={commentEdit}
        del={del}
      />
    </div>
  );
};

export default TopicComment;
