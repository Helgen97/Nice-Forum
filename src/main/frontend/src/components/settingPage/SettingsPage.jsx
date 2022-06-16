import React from "react";
import $ from "jquery";
import { useAuth } from "../../context/Auth";
import MetaTags from "../UI/meta/MetaTags";
import ProfileMenu from "./ProfileMenu";
import SecurityMenu from "./SecurityMenu";
import DeleteMenu from "./DeleteMenu";
import PermissionDeniedBlock from '../UI/permissionDeniedPage/PermissionDeniedBlock';

const SettingsPage = () => {
  const { isAuth, currentUser } = useAuth();

  if(!isAuth) return <PermissionDeniedBlock />

  function userMenu() {
    $("#user").addClass("active__menu");
    $("#profile_menu").addClass("settings__panel-edit__block-active");
    $("#security").removeClass("active__menu");
    $("#security_menu").removeClass("settings__panel-edit__block-active");
    $("#delete").removeClass("active__menu");
    $("#delete_menu").removeClass("settings__panel-edit__block-active");
  }

  function securityMenu() {
    $("#user").removeClass("active__menu");
    $("#profile_menu").removeClass("settings__panel-edit__block-active");
    $("#security").addClass("active__menu");
    $("#security_menu").addClass("settings__panel-edit__block-active");
    $("#delete").removeClass("active__menu");
    $("#delete_menu").removeClass("settings__panel-edit__block-active");
  }

  function deleteMenu() {
    $("#user").removeClass("active__menu");
    $("#profile_menu").removeClass("settings__panel-edit__block-active");
    $("#security").removeClass("active__menu");
    $("#security_menu").removeClass("settings__panel-edit__block-active");
    $("#delete").addClass("active__menu");
    $("#delete_menu").addClass("settings__panel-edit__block-active");
  }

  return (
    <main className="settings-page">
      <MetaTags
        title={
          currentUser.nickname +
          " - Настройки профиля - Nice Forum - Форум приятого общения!"
        }
        description={
          currentUser.nickname +
          " - Настройки профиля - Nice Forum - Форум приятого общения!"
        }
        keywords="Форум, общение, разделы, дружба, новости, личный кабинет, настройки, изменение данных"
      />

      <div className="settings">
        <div className="settings__title">
          <h2 className="settings_header">Настройки профиля</h2>
        </div>
        <div className="settings__panel">
          <div className="settings__panel-navigation">
            <ul>
              <li id="user" className="settings__panel-navigation-li active__menu" onClick={userMenu}>
                <span className="settings__panel-navigation_link">Учетная запись</span>
              </li>
              <li id="security" onClick={securityMenu} className="settings__panel-navigation-li">
                <span className="settings__panel-navigation_link">Безопасность</span>
              </li>
              <li id="delete" onClick={deleteMenu} className="settings__panel-navigation-li">
                <span className="settings__panel-navigation_link">Удалить аккаунт</span>
              </li>
            </ul>
          </div>
          <div className="settings__panel-edit">
            <ProfileMenu currentUser={currentUser} />
            <SecurityMenu />
            <DeleteMenu userId={currentUser.id} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default SettingsPage;
