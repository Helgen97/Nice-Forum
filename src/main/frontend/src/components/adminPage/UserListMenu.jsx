import React, { useEffect, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";
import UserCard from "./UserCard";
import { useObserver } from "../../hooks/useObserver";

const UserListMenu = ({ lastElement }) => {
  const usersPerPage = 6;
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [userList, setUserList] = useState([]);
  const [getUserListPage, isGetting, gettingError] = useFetching(
    async (page) => {
      const userListPage = await UserService.getAllUsers(page, usersPerPage);
      setUserList([...userList, ...userListPage.content]);
      setTotalPages(userListPage.totalPages);
    }
  );

  useObserver(lastElement, page < totalPages, isGetting, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    getUserListPage(page);
  }, [page]);

  function updateListOfUser(userId) {
    const newUserList = userList.filter((user) => user.id !== userId);
    setUserList(newUserList);
  }

  return (
    <div id="user_list_menu" className="settings__panel-edit__block">
      <div className="settings__panel-edit__title">
        <h3>User list:</h3>
      </div>
      <div className="user__card-list">
        {userList.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            updateListOfUser={updateListOfUser}
          />
        ))}
        {isGetting && <Loader />}
        {gettingError && <Error error={gettingError} />}
      </div>
    </div>
  );
};

export default UserListMenu;
