import React, { useState, useEffect, useMemo } from "react";
import $ from "jquery";
import { useFetching } from "../../hooks/useFetching";
import Throttle from "lodash.throttle";
import TagService from "../../API/TagService";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const SearchTagMenu = ({ setTag, unchooseTag, tags = "" }) => {
  const [tagName, setTagName] = useState("");

  const [chosenTags, setChosenTags] = useState(tags);

  const [tagList, setTagList] = useState([]);
  const [getTagList, isGetting, gettingError] = useFetching(async (tagName) => {
    if (tagName === "") return;
    const tags = await TagService.getTagList(tagName);
    setTagList(tags);
  });

  const throttleChangeHandler = useMemo(
    () => Throttle((tagName) => getTagList(tagName), 1000),
    []
  );

  useEffect(() => {
    return () => {
      throttleChangeHandler.cancel();
    };
  }, [throttleChangeHandler]);

  function unChoose(e) {
    setChosenTags(chosenTags.replace($(e.target).text() + ",", ""));
    $("#tag_input").val(
      $("#tag_input")
        .val()
        .replace($(e.target).text() + ",", "")
    );
    unchooseTag($(e.target).text());
  }

  function selectTag(e) {
    if (checklimitSelectedTags()) return;

    let tagName = $(e.target).text();

    setTag(tagName);
    setChosenTags(
      chosenTags === "" ? tagName + "," : chosenTags.concat(tagName + ",")
    );

    $("#tag_input").val(
      $("#tag_input")
        .val()
        .concat(tagName + (chosenTags.split(",").length === 2 ? "." : ","))
    );
    setTagName("");
  }

  function checklimitSelectedTags() {
    if (chosenTags.length === 3) {
      setTagName("");
      return true;
    } else {
      return false;
    }
  }

  $(document).on("click", function (e) {
    if ($(e.target).closest("#tag_menu").length) {
      $("#tag_menu").addClass("select-container__tag-active");
      return;
    }
    $("#tag_menu").removeClass("select-container__tag-active");
  });

  return (
    <div id="tag_menu" className="select-container__tag">
      <label htmlFor="section">Tags:</label>
      <div className="tag__menu">
        <div className="tag__menu-input">
          <input
            type="text"
            id="tag_input"
            placeholder="Select tags"
            value={chosenTags}
            readOnly
          />
        </div>
        <div className="tag__menu-dropdown">
          <div className="tag__menu-dropdown__tag-search">
            <input
              type="text"
              placeholder="Enter tag name"
              value={tagName}
              onChange={(e) => {
                setTagName(e.target.value);
                throttleChangeHandler(e.target.value);
              }}
            />
          </div>
          <div className="tag__menu-dropdown__chosen-tags">
            {chosenTags !== "" &&
              chosenTags.split(",").map((tag, index) => (
                <span
                  key={index + tag}
                  onClick={unChoose}
                  className="dropdown__chosen-tag"
                >
                  {tag}
                </span>
              ))}
          </div>
          <div>
            {isGetting && <Loader />}
            {gettingError && <Error error={gettingError} />}
            <ul className="dropdown-ul">
              {tagList.map((tag) => (
                <li
                  id={tag.id}
                  key={tag.id}
                  onClick={selectTag}
                  className="dropdown-li"
                >
                  {tag.tagName}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchTagMenu;
