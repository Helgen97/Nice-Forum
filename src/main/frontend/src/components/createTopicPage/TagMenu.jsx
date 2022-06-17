import React, { useState, useEffect, useMemo } from "react";
import $ from "jquery";
import { useFetching } from "../../hooks/useFetching";
import Throttle from "lodash.throttle";
import TagService from "../../API/TagService";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const TagMenu = ({ setTags, unChooseTag, setError }) => {
  const [tagName, setTagName] = useState("");

  const [chosenTags, setChosenTags] = useState([]);

  const [tagList, setTagList] = useState([]);
  const [getTagList, isLoading, gettingTagListError] = useFetching(
    async (tagName) => {
      if (tagName === "") return;
      const tags = await TagService.getTagList(tagName);
      setTagList(tags);
    }
  );

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
    setError("");
    unChooseTag($(e.target).text());
    setChosenTags(
      chosenTags.filter((tag) => tag.tagName !== $(e.target).text())
    );
    $("#tag_input").val(
      $("#tag_input")
        .val()
        .replace($(e.target).text() + ",", "")
    );
  }

  function selectTag(e) {
    if (checklimitSelectedTags()) return;

    let chosenTag = {
      id: $(e.target).attr("id"),
      tagName: $(e.target).text(),
    };

    addTag(chosenTag);
  }

  const createTag = () => {
    if (checklimitSelectedTags()) return;
    if (tagName === "") return;

    let chosenTag = {
      tagName: tagName,
    };

    addTag(chosenTag);
  };

  function checklimitSelectedTags() {
    if (chosenTags.length === 3) {
      setError("Reached tag limit!");
      setTagName("");
      return true;
    } else {
      setError("");
      return false;
    }
  }

  function addTag(tag) {
    setTags(tag);
    $("#tag_input").val(
      $("#tag_input")
        .val()
        .concat(tag.tagName + (chosenTags.length === 2 ? "." : ","))
    );
    setChosenTags([...chosenTags, tag]);
    setTagName("");
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
            placeholder="Choose tags"
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
            {chosenTags.map((tag, index) => (
              <span
                key={index + tag.tagName}
                onClick={unChoose}
                className="dropdown__chosen-tag"
              >
                {tag.tagName}
              </span>
            ))}
          </div>
          <div>
            {isLoading && <Loader />}
            {gettingTagListError && <Error error={gettingTagListError} />}
            <ul className="dropdown-ul">
              {tagName === "" ||
              tagList.some((tag) => tag.tagName === tagName) ? (
                ""
              ) : (
                <li onClick={createTag} className="dropdown-li">
                  Create: {tagName}
                </li>
              )}
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

export default TagMenu;
