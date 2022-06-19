import React from "react";
import $ from "jquery";
import { useAuth } from "../../context/Auth";

const CommentFooter = ({ creatorID, edit, like, likesCount, del }) => {
  const { isAuth, currentUser } = useAuth();

  function share(e) {
    if ($(e.target).parent().hasClass("share-btn-container-active")) {
      $(e.target).parent().removeClass("share-btn-container-active");
    } else {
      $(e.target).parent().addClass("share-btn-container-active");
      $(".share_input").val(window.location.href);
      $(".share_input").trigger("select");
    }
  }

  $(document).on("click", function (e) {
    if ($(e.target).closest(".share-btn-container").length) {
      return;
    }
    $(".share-btn-container").removeClass("share-btn-container-active");
  });

  function reply() {
    $(".new__comment").show();
    $("html, body").animate(
      {
        scrollTop: $(".new__comment").offset().top,
      },
      800
    );
  }

  return (
    <div className="comment__footer">
      <div className="like_counter">{likesCount}</div>
      {!isAuth && (
        <div className="like-btn-container">
          <button className="like-btn like-btn-active" title="Like"></button>
        </div>
      )}
      {isAuth && (
        <div className="like-btn-container" onClick={like}>
          <button className="like-btn" title="Like"></button>
        </div>
      )}
      {isAuth &&
        (creatorID === currentUser.id ||
          currentUser.role === "ADMIN" ||
          currentUser.role === "MODERATOR") && (
          <div className="edit-btn-container">
            <button className="edit-btn" onClick={edit} title="Edit" />
          </div>
        )}
      {isAuth && (
        <div className="reply-btn-container">
          <button className="reply-btn" onClick={reply} title="Reply"></button>
        </div>
      )}
      {isAuth &&
        (creatorID === currentUser.id ||
          currentUser.role === "ADMIN" ||
          currentUser.role === "MODERATOR") && (
          <div className="delete-btn-container">
            <button
              className="delete-btn"
              onClick={del}
              title="Delete"
            ></button>
          </div>
        )}
        <div className="share-btn-container">
        <button className="share-btn" onClick={share} title="Share"></button>
        <div className="share-menu">
          <div className="share-menu__title">
            <p>Share</p>
          </div>
          <div>
            <input className="share_input" type="text" readOnly />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentFooter;
