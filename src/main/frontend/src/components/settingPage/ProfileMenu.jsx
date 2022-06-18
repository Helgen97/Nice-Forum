import React, { useEffect, useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import Input from "../UI/input/Input";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const ProfileMenu = ({ currentUser }) => {
  const [user, setUser] = useState({
    id: 0,
    email: "",
    nickname: "",
    firstName: "",
    lastName: "",
    birthday: "",
  });

  const [updateUser, isUpdating, updateError] = useFetching(async () => {
    const updatedUser = await UserService.updateUser(user.id, user);
    setUser(updatedUser);
  });

  useEffect(() => {
    setUser(currentUser);
  }, [currentUser]);

  if (isUpdating) return <Loader />;
  if (updateError) return <Error error={updateError} />;

  return (
    <div
      id="profile_menu"
      className="settings__panel-edit__block settings__panel-edit__block-active"
    >
      <div className="settings__panel-edit__title">
        <h3>Account</h3>
      </div>
      <Input
        id={"email"}
        type={"text"}
        labelText={"Email: "}
        placeholder={"Enter new email"}
        value={user.email || ""}
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <Input
        id={"name"}
        type={"text"}
        labelText={"First name:"}
        placeholder={"Enter new name"}
        value={user.firstName || ""}
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <Input
        id={"surname"}
        type={"text"}
        labelText={"Last name:"}
        placeholder={"Enter new last name"}
        value={user.lastName || ""}
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <Input
        id={"birthday"}
        type={"date"}
        labelText={"Birhday:"}
        placeholder={user.birthday === "" ? "Enter birthday" : ""}
        value={user.birthday || ""}
        onChange={(e) => setUser({ ...user, birthday: e.target.value })}
      />

      <div className="form-btn-container">
        <button className="form-btn" onClick={updateUser}>
          Save changes
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
