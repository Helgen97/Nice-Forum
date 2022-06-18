import React, { useEffect, useState } from "react";
import UserService from "../../API/UserService";
import { useFetching } from "../../hooks/useFetching";
import Error from "../UI/errorBanner/Error";
import Input from "../UI/input/Input";
import Loader from "../UI/loader/Loader";

const AvatarMenu = () => {
  const [avatarUrl, setAvatarUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [changeAvatar, isLoading, changingError] = useFetching(
    async (avatarUrl) => {
      const responce = await UserService.changeAvatarUrl(avatarUrl);
      setAvatarUrl(responce);
    }
  );

  useEffect(() => {

  }, [])

  function change() {
    let urlPattern = /\b(https?:\/\/\S*\b)/g;
    if (avatarUrl.length > 255) {
      setErrorMessage("URL too long!");
      return;
    }
    if (avatarUrl.match(urlPattern) || avatarUrl === "Default") {
      setErrorMessage("");
      changeAvatar(avatarUrl);
    } else {
      setErrorMessage("URL do not match!");
      return;
    }
  }

  if (isLoading) return <Loader />;
  if (changingError) return <Error error={changingError} />;

  return (
    <div id="avatar_menu" className="settings__panel-edit__block">
      <div className="settings__panel-edit__title">
        <h3>Change avatar</h3>
      </div>
      <Input
        id={"avatarUrl"}
        type={"text"}
        labelText={"Avatar URL"}
        placeholder={"Enter link to your image"}
        value={avatarUrl}
        onChange={(e) => setAvatarUrl(e.target.value)}
        error={errorMessage}
      />
      <div className="form-btn-container">
        <button className="form-btn" onClick={change}>
          Change
        </button>
      </div>
    </div>
  );
};

export default AvatarMenu;
