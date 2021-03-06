import React, { useState } from "react";
import UserService from "../../API/UserService";
import { useFetching } from "../../hooks/useFetching";
import Input from "../UI/input/Input";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const SecurityMenu = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [message, setMessage] = useState({
    message: "",
    error: true,
  });

  const [emptyInputsError, setInputEmptyError] = useState({
    message: "",
    error: true,
  });

  const [samePasswordsError, setSamePasswordsError] = useState({
    message: "",
    error: false,
  });

  const [changePassword, isChanging, changeError] = useFetching(async () => {
    const responceMessage = await UserService.changePassword(
      oldPassword,
      newPassword
    );
    setMessage(responceMessage);
  });

  function change() {
    checkEmptyImputs();
    checkNewPasswordSame();

    if (!emptyInputsError.error && !samePasswordsError.error) {
      changePassword();
    }
  }

  function checkEmptyImputs() {
    if (oldPassword === "" || newPassword === "" || newPasswordConfirm === "") {
      setInputEmptyError({ message: "Заполните пустые поля!", error: true });
    } else {
      setInputEmptyError({ message: "", error: false });
    }
  }

  function checkNewPasswordSame() {
    if (newPassword !== newPasswordConfirm) {
      setSamePasswordsError({ message: "Пароли не совпадают!", error: true });
    } else {
      setSamePasswordsError({ message: "", error: false });
    }
  }

  if (isChanging) return <Loader />;
  if (changeError) return <Error error={changeError} />;

  return (
    <div id="security_menu" className="settings__panel-edit__block">
      <div className="settings__panel-edit__title">
        <h3>Change password:</h3>
      </div>
      <p className="input_message">{message.message}</p>
      <Input
        id="old_password"
        labelText="Old password:"
        type="password"
        placeholder="Enter current password"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />
      <Input
        id="new_password"
        labelText="New password:"
        type="password"
        placeholder="Create new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        error={emptyInputsError.message || samePasswordsError.message}
      />
      <Input
        id="new_password_confirm"
        labelText="Confirm password:"
        type="password"
        placeholder="Confirm new password"
        value={newPasswordConfirm}
        onChange={(e) => setNewPasswordConfirm(e.target.value)}
      />
      <div className="form-btn-container">
        <button className="form-btn" onClick={change}>
          Change password
        </button>
      </div>
    </div>
  );
};

export default SecurityMenu;
