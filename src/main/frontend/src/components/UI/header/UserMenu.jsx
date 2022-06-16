import React from "react";
import $ from "jquery";
import UserMenuActiveMenu from "./UserMenuActiveMenu";

const UserMenu = () => {
  $(document).on("click", function (e) {
    if ($(e.target).closest($("#user_menu")).length) {
      $($("#user_menu")).addClass("user_menu-active");
      return;
    }
    $($("#user_menu")).removeClass("user_menu-active");
  });

  return (
    <div id="user_menu" className="user_menu">
      <button className="navigation__user-btn"></button>
      <UserMenuActiveMenu />
    </div>
  );
};

export default UserMenu;
