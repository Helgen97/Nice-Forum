import React, { useState, useEffect } from "react";
import $ from "jquery";
import { useFetching } from "../../hooks/useFetching";
import SectionService from "../../API/SectionService";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const SearchSectionMenu = ({ setSection, section }) => {
  const [sections, setSections] = useState([]);
  const [getSections, isLoading, gettingSectionsError] = useFetching(
    async () => {
      const sections = await SectionService.getAll();
      setSections(sections);
    }
  );

  useEffect(() => {
    getSections();
  }, []);

  function selectSection(e) {
    let sectionTitle = $(e.target).text();
    setSection(sectionTitle);
    $("#section_menu").removeClass("select-container__section-active");
    $("#section_input").val(sectionTitle);
  }

  $(document).on("click ", function (e) {
    if ($(e.target).closest("#section_menu").length) {
      $("#section_menu").addClass("select-container__section-active");
      return;
    }
    $("#section_menu").removeClass("select-container__section-active");
  });

  if (isLoading) return <Loader />;
  if (gettingSectionsError) return <Error error={gettingSectionsError} />;

  return (
    <div id="section_menu" className="select-container__section">
      <label htmlFor="section">Раздел:</label>
      <div className="section__menu">
        <div className="section__menu-input">
          <input
            id="section_input"
            type="text"
            placeholder="Выберите раздел"
            value={section}
            readOnly
          />
        </div>
        <div className="section__menu-dropdown">
          <ul>
            {sections.map((section) => (
              <li className="dropdown-ul" id={section.id} key={section.id} onClick={selectSection} className="dropdown-li">
                {section.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SearchSectionMenu;
