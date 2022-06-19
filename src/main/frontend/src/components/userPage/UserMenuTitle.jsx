import React, { useState, useEffect } from "react";
import avatar from "../../img/avatar.svg";

const UserMenuTitle = ({ nickname, userID, avatarUrl }) => {
  const [isAuth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setAuth(sessionStorage.getItem("isAuth") === "true");
    setCurrentUser(JSON.parse(sessionStorage.getItem("currentUser")));
  }, []);

  return (
    <div className="user-menu__title">
      <div>
        <img src={avatarUrl && avatarUrl !== "Default" ? avatarUrl : avatar}  alt={nickname} className="user-menu__title-avatar"/>
      </div>
      <div className="user-menu__title-nickname">
        <h2>{nickname}</h2>
      </div>
      {isAuth && Number(userID) === currentUser.id && (
        <div className="setting-btn_container">
          <a href="/settings" className="setting-btn" title="To settings" />
        </div>
      )}
    </div>
  );
};

export default UserMenuTitle;
