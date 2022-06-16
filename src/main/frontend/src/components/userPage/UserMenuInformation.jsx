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
        Имя: <span className="user-menu__information-title__user-info">{firstName}</span>
      </p>
      <p className="user-menu__information-title">
        Фамилия: <span className="user-menu__information-title__user-info">{lastName}</span>
      </p>
      <p className="user-menu__information-title">
        Email: <span className="user-menu__information-title__user-info">{email}</span>
      </p>
      <p className="user-menu__information-title">
        Роль: <span className="user-menu__information-title__user-info">{role}</span>
      </p>
      <p className="user-menu__information-title">
        Дата регистрации: <span className="user-menu__information-title__user-info">{registrationDate}</span>
      </p>
      <p className="user-menu__information-title">
        Дата рождения: <span className="user-menu__information-title__user-info">{birthday}</span>
      </p>
    </div>
  );
};

export default UserMenuInformation;
