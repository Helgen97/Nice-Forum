import React, { useState, useEffect } from "react";
import avatar from "../../img/avatar.svg";

const UserMenuTitle = ({ nickname, userID }) => {
  const [isAuth, setAuth] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    setAuth(localStorage.getItem("isAuth") === "true");
    setCurrentUser(JSON.parse(localStorage.getItem("currentUser")));
  }, []);

  return (
    <div className="user-menu__title">
      <div className="user-menu__title-avatar">
        <img src={avatar} alt={nickname} />
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
