import React from "react";
import $ from "jquery";

const MobileMenu = () => {
  $(document).on("click", function (e) {
    if ($(e.target).closest("#navigation_mobile").length) {
      $("#navigation_mobile").addClass("navigation__mobile_active");
      return;
    }
    $("#navigation_mobile").removeClass("navigation__mobile_active");
  });

  return (
    <div id="navigation_mobile" className="navigation__mobile">
      <button className="navigatition__menu_mobile_btn"></button>
      <div className="navigation__menu_mobile_active">
        <ul className="navigation__menu-list">
          <li className="navigatiom__menu-list__li">
            <a href="/" className="navigatiom__menu-list__li-link">Главная</a>
          </li>
          <li className="navigatiom__menu-list__li">
            <a href="/create" className="navigatiom__menu-list__li-link">Создать тему</a>
          </li>
          <li className="navigatiom__menu-list__li">
            <a href="/about" className="navigatiom__menu-list__li-link">Про форум</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MobileMenu;
