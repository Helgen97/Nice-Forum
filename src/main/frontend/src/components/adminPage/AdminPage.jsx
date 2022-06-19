import React, { useRef } from "react";
import { useAuth } from "../../context/Auth";
import $ from "jquery";
import SectionMenu from "./SectionMenu";
import UserListMenu from "./UserListMenu";
import PermissionDeniedBlock from "../UI/permissionDeniedPage/PermissionDeniedBlock";
import MetaTags from "../UI/meta/MetaTags";

const AdminPage = () => {
  const lastElement = useRef();

  const { isAuth, currentUser } = useAuth();

  function sectionMenu() {
    $("#user_list").removeClass("active__menu");
    $("#user_list_menu").removeClass("settings__panel-edit__block-active");
    $("#new_section").addClass("active__menu");
    $("#new_section_menu").addClass("settings__panel-edit__block-active");
  }

  function userListMenu() {
    $("#new_section").removeClass("active__menu");
    $("#new_section_menu").removeClass("settings__panel-edit__block-active");
    $("#user_list").addClass("active__menu");
    $("#user_list_menu").addClass("settings__panel-edit__block-active");
  }

  if (!isAuth && currentUser.role !== "ADMIN") return <PermissionDeniedBlock />;

  return (
    <main className="admin-page">
      <MetaTags
        title="Admin Page - Nice Forum - Forum of Nice Communication!"
        description={"Forum admin page."}
        keywords={"Forum, speaking, sections, friendship, admin page"}
        noRobots={true}
      />
      <div className="settings">
        <div className="settings__title">
          <h2>Admin panel</h2>
        </div>
        <div className="settings__panel">
          <div className="settings__panel-navigation">
            <ul>
              <li
                id="new_section"
                className="settings__panel-navigation-li active__menu"
                onClick={sectionMenu}
              >
                <span className="settings__panel-navigation_link">
                  New section
                </span>
              </li>
              <li
                id="user_list"
                onClick={userListMenu}
                className="settings__panel-navigation-li"
              >
                <span className="settings__panel-navigation_link">Users</span>
              </li>
            </ul>
          </div>
          <div className="settings__panel-edit">
            <SectionMenu />
            <UserListMenu lastElement={lastElement} />
          </div>
        </div>
      </div>
      <div ref={lastElement}></div>
    </main>
  );
};

export default AdminPage;
