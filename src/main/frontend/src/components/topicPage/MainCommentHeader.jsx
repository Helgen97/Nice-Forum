import React from "react";

const MainCommentHeader = ({ title, sectionTitle, tags = [] }) => {
  return (
    <div className="comment__header">
      <div className="comment__header-title">
        <span>{title}</span>
      </div>
      <div className="comment__header-description">
        <div className="comment__header-description__section">
          <span>{sectionTitle}</span>
        </div>
        <div className="comment__header-description__tags">
          {tags.map((tag, index) => (
            <a href={"/search?tags=" + tag.tagName + ","} key={index} className="comment__header-description__tags-link">
              {tag.tagName}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainCommentHeader;
