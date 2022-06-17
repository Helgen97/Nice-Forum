import React from "react";

const UserMenuInformation = ({
  firstName,
  lastName,
  email,
  role,
  registrationDate,
  birthday,
}) => {
  return (
    <div className="user-menu__information">
      <p className="user-menu__information-title">
        Name:{" "}
        <span className="user-menu__information-title__user-info">
          {firstName}
        </span>
      </p>
      <p className="user-menu__information-title">
        Last Name:{" "}
        <span className="user-menu__information-title__user-info">
          {lastName}
        </span>
      </p>
      <p className="user-menu__information-title">
        Email:{" "}
        <span className="user-menu__information-title__user-info">{email}</span>
      </p>
      <p className="user-menu__information-title">
        Role:{" "}
        <span className="user-menu__information-title__user-info">{role}</span>
      </p>
      <p className="user-menu__information-title">
        Join date:{" "}
        <span className="user-menu__information-title__user-info">
          {registrationDate}
        </span>
      </p>
      <p className="user-menu__information-title">
        Bithday:{" "}
        <span className="user-menu__information-title__user-info">
          {birthday}
        </span>
      </p>
    </div>
  );
};

export default UserMenuInformation;
