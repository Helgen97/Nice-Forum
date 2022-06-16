import React, { useState } from "react";
import $ from "jquery";
import { useFetching } from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const UserCard = ({ user, updateListOfUser }) => {
  const USER_ROLES = ["ADMIN", "MODERATOR", "USER"];

  const [cardUser, setCardUser] = useState(user);
  const selectID = cardUser.nickname + "_select";
  const [updateUserRole, isUpdatingRole, updatingUserRoleError] = useFetching(
    async (userId, newRole) => {
      const userWithNewRole = UserService.updateUserRole(userId, newRole);
      userWithNewRole.then((result) => setCardUser(result));
    }
  );
  const [deleteUser, isDeleting, deletingError] = useFetching(
    async (userId) => {
      UserService.deleteUser(userId);
    }
  );

  function delUser() {
    if (window.confirm("Удалить пользователя?")) {
      deleteUser(user.id);
      updateListOfUser(user.id)
    }
  }

  function update() {
    let newRole = $("#" + selectID + " option:selected").text();
    updateUserRole(cardUser.id, newRole);
  }

  if (isUpdatingRole || isDeleting) return <Loader />;
  if (updatingUserRoleError || deletingError) return <Error error={updatingUserRoleError || deletingError} />;

  return (
    <div className="user__card">
      <p>Никнейм:</p>
      <span>{cardUser.nickname}</span>
      <p>Емейл: </p>
      <span>{cardUser.email}</span>
      <p>Текущая роль: </p>
      <span>{cardUser.role}</span>
      <p>Сменить роль:</p>
      <div>
        <select id={selectID}>
          {USER_ROLES.map((role) =>
              <option key={role} value={role}>
                {role}
              </option>
          )}
        </select>
        <button className="confirm-btn" onClick={update} />
      </div>
      <div>
        <p>Удалить пользователя: </p>
        <button
          className="decline-btn"
          title="Удалить"
          onClick={delUser}
        ></button>
      </div>
    </div>
  );
};

export default UserCard;
