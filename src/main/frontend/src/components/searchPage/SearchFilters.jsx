import React from "react";
import $ from 'jquery';
import SearchSectionMenu from "./SearchSectionMenu";
import Input from "../UI/input/Input";
import SearchTagMenu from "./SearchTagMenu";

const SearchFilters = ({ applyFilters, params, setParams }) => {
  function apply() {
    applyFilters();
    $(".search__filters").removeClass("search__filters-active");
  }

  function setSection(sectionId) {
    setParams({ ...params, section: sectionId });
  }

  function setTag(tagName) {
    setParams({ ...params, tags: params.tags.concat(tagName + ",") });
  }

  function unchooseTag(tagName) {
    setParams({ ...params, tags: params.tags.replace(tagName + ",", "") });
  }

  function clean() {
    setParams({
      title: "",
      author: "",
      section: "",
      tags: "",
      from: "",
      to: "",
    });
    $(".search__filters").removeClass("search__filters-active");
  }

  function openFilterMenu(){
    if($(".search__filters").hasClass("search__filters-active")) {
      $(".search__filters").removeClass("search__filters-active");
  } else {
      $(".search__filters").addClass("search__filters-active");
  }
  }

  return (
    <div className="search__filters">
      <div className="search__filters-title">
        <h3>Search filters</h3>
        <button className="search__filters-title-btn" onClick={openFilterMenu}></button>
      </div>
      <Input
        id={"author"}
        labelText={"Author:"}
        type={"text"}
        placeholder={"Author nickname"}
        value={params.author}
        onChange={(e) => setParams({ ...params, author: e.target.value })}
      />
      <SearchSectionMenu setSection={setSection} section={params.section} />
      <SearchTagMenu
        setTag={setTag}
        unchooseTag={unchooseTag}
        tags={params.tags}
      />

      <div className="search__filters-date">
        <div>
          <label>Date:</label>
        </div>
        <Input
          id={"date_start"}
          labelText={"Starts from:"}
          type="date"
          value={params.from}
          onChange={(e) => setParams({ ...params, from: e.target.value })}
        />
        <Input
          id={"date_end"}
          labelText={"Up to (including):"}
          type={"date"}
          value={params.to}
          onChange={(e) => setParams({ ...params, to: e.target.value })}
        />
      </div>
      <div className="form-btn-container">
        <button className="form-btn" onClick={apply}>
          Apply
        </button>
        <button className="form-btn" onClick={clean}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchFilters;
