import React from "react";
import avatar from "../../../img/avatarS.svg";

const UserMenuTitle = ({ user }) => {
  return (
    <div className="user-active_menu__title">
      <div className="user-active_menu__title-img">
        <img src={avatar} alt="avatar" />
      </div>
      <div className="user-active_menu__title-text">
        <p className="user-active_menu__nickname">{user.nickname}</p>
        <p>
          {user.firstName} {user.lastName}
        </p>
      </div>
    </div>
  );
};

export default UserMenuTitle;
