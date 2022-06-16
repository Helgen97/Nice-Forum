import React from "react";

const SectionHeader = ({ title, description }) => {
  return (
    <div className="section__header">
      <div className="section__header-title">
        <h2>{title}</h2>
      </div>
      <div className="section_page__header-description">
        <p>{description}</p>
      </div>
    </div>
  );
};

export default SectionHeader;
