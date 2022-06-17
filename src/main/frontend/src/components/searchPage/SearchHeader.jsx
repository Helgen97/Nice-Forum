import React from "react";

const SearchHeader = ({ value, onChange, search }) => {
  return (
    <div className="search__header">
      <label className="search__header-title" htmlFor="search__title-input">
        Advanced Search:
      </label>
      <div className="search__header-input">
        <input
          id="search__title-input"
          type="text"
          placeholder="Enter topic title"
          value={value}
          onChange={onChange}
          onKeyDown={search}
        />
      </div>
    </div>
  );
};

export default SearchHeader;
