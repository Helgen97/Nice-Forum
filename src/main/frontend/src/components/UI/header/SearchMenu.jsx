import React, { useState } from "react";
import $ from "jquery";

const SearchMenu = () => {
  const [title, setTitle] = useState("");

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (title !== "") {
        window.location.replace("/search?title=" + title);
      }
    }
  };

  $(document).on("click", function (e) {
    if ($(e.target).closest($("#search_menu")).length) {
      $($("#search_menu")).addClass("search_menu-active");
      return;
    }
    $($("#search_menu")).removeClass("search_menu-active");
  });

  return (
    <div id="search_menu" className="search_menu">
      <button className="navigation__search-btn"></button>
      <div className="navigation__search-active_menu">
        <div className="search_menu__input-container">
          <input
            id="quick_search"
            type="text"
            placeholder="Поиск тем"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="search_menu__input"
          />
        </div>
        <div className="search_menu__link-container">
          <a href="/search" className="search_menu__link">расширеный поиск</a>
        </div>
      </div>
    </div>
  );
};

export default SearchMenu;
