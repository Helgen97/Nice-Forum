import React, { useEffect, useRef, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import CommentService from "../../API/CommentService";
import TopicComment from "./TopicComment";
import NewComment from "./NewComment";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";
import { useObserver } from "../../hooks/useObserver";
import { useAuth } from "../../context/Auth";

const CommentList = ({ topicId }) => {
  const { isAuth } = useAuth();
  const commentsPerPage = 6;
  const lastElement = useRef();
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [topicComments, setTopicComments] = useState([]);
  const [getTopicCommentsPage, isLoading, gettingTopicCommentsPageError] =
    useFetching(async (topicId, page) => {
      const commentsPage = await CommentService.getTopicComments(
        topicId,
        page,
        commentsPerPage
      );
      setTopicComments([...topicComments, ...commentsPage.content]);
      setTotalPages(commentsPage.totalPages);
    });

  useObserver(lastElement, page < totalPages, isLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    getTopicCommentsPage(topicId, page);
  }, [page]);

  const addNewComment = (comment) => {
    setTopicComments([...topicComments, comment]);
  };

  const removeComment = (deletingComment) => {
    const newCommentsList = topicComments.filter(
      (comment) => comment.id !== deletingComment.id
    );
    setTopicComments(newCommentsList);
  };

  return (
    <div className="comment">
      {topicComments.map((comment, index) => (
        <TopicComment
          comment={comment}
          key={comment.id}
          index={index}
          removeComment={removeComment}
          isAuth={isAuth}
        />
      ))}
      {isLoading && <Loader />}
      {gettingTopicCommentsPageError && (
        <Error error={gettingTopicCommentsPageError} />
      )}
      {isAuth && <NewComment topicId={topicId} addNewComment={addNewComment} />}
      <div ref={lastElement}></div>
    </div>
  );
};

export default CommentList;
