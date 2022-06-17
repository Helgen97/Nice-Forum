import React, { useState, useEffect } from "react";
import { useFetching } from "../../hooks/useFetching";
import CommentService from "../../API/CommentService";
import UserComment from "./UserComment";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const UserMenuComments = ({ userId }) => {
  const commentsPerPage = 4;
  const [userComments, setUserComments] = useState([]);
  const [getUserCommentsPage, isLoading, gettingsUserCommentsPageError] = useFetching(
    async (userId) => {
      const commentsPage = await CommentService.getCommentsByUserId(
        userId,
        0,
        commentsPerPage
      );
      setUserComments(commentsPage.content);
    }
  );

  useEffect(() => {
    getUserCommentsPage(userId);
  }, [userId]);

  if (isLoading) return <Loader />;
  if (gettingsUserCommentsPageError)
    return <Error error={gettingsUserCommentsPageError} />;

  return (
    <div className="user-comments">
      <div className="user-content__head">
        <h2>Latest comments</h2>
      </div>

      {userComments.map((comment) => (
        <UserComment comment={comment} key={comment.id} />
      ))}
    </div>
  );
};

export default UserMenuComments;
