import React from "react";
import { useAuth } from "../../../context/Auth";
import UserActiveMenuButton from "./UserActiveMenuButton";
import UserMenuTitle from "./UserMenuTitle";

const UserMenuActiveMenu = () => {
  const { isAuth, currentUser } = useAuth();

  const nonAuthUser = {
    nickname: "Please sign in",
    firstName: "",
    lastName: "",
  };

  function authorizeUser() {
    return (
      <div className="navigation__user-active_menu">
        <UserMenuTitle user={currentUser} />
        <div className="user-active_menu__panel">
          <UserActiveMenuButton
            name="profile"
            alt="profile_ico"
            text=" Profile"
            link={"/user/" + currentUser.id}
          />
          <UserActiveMenuButton
            name="settings"
            alt="settings_ico"
            text=" Settings"
            link="/settings"
          />
          <UserActiveMenuButton
            name="logout"
            alt="logout_ico"
            text=" Logout"
            link="/signout"
          />
        </div>
      </div>
    );
  }

  function nonAuthorizeUser() {
    return (
      <div className="navigation__user-active_menu">
        <UserMenuTitle user={nonAuthUser} />
        <div className="user-active_menu__panel">
          <UserActiveMenuButton
            name="login"
            alt="login_ico"
            text=" Sign in"
            link="/signin"
          />
          <UserActiveMenuButton
            name="register"
            alt="register_ico"
            text=" Sign up"
            link="/register"
          />
        </div>
      </div>
    );
  }

  return isAuth ? authorizeUser() : nonAuthorizeUser();
};

export default UserMenuActiveMenu;
