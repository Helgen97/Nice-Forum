import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFetching } from "../../hooks/useFetching";
import UserService from "../../API/UserService";
import Input from "../UI/input/Input";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const RegisterForm = () => {
  const Navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    email: "",
    nickname: "",
    password: "",
    firstName: "",
    lastName: "",
    birthday: "",
  });

  const [passwordConfirm, SetPasswordConfirm] = useState("");

  const [emptyInputsError, setEmptyInputsError] = useState("");

  const [emailInputMessage, setEmailInputMessage] = useState({
    message: "",
    error: false,
  });
  const [emailPatternError, setEmailPatternError] = useState(false);
  const [loginInputMessage, setLoginInputMessage] = useState({
    message: "",
    error: false,
  });
  const [passwordInputsMessage, setPasswordInputsMessage] = useState({
    message: "",
    error: false,
  });
  const [checkEmailFree] = useFetching(async () => {
    const responce = await UserService.emailAvailable(newUser.email);
    setEmailInputMessage(responce);
  });
  const [checkLoginFree] = useFetching(async () => {
    const responce = await UserService.loginAvailable(newUser.nickname);
    setLoginInputMessage(responce);
  });

  const [createUser, isCreating, creatingError] = useFetching(async () => {
    await UserService.createUser(newUser);
  });

  const handleEnterEvent = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      register();
    }
  };

  const register = (e) => {
    e.preventDefault();

    if (checkInputsEmpty()) {
      setEmptyInputsError("Fill in the empty fields!");
      return;
    }
    setEmptyInputsError("");

    checkEmailFree();
    checkLoginFree();
    checkPasswordSame();

    if (
      !emailPatternError &&
      !emailInputMessage.error &&
      !loginInputMessage.error &&
      !passwordInputsMessage.error
    ) {
      createUser();
      Navigate("/signin", { replace: true });
    }
  };

  function checkInputsEmpty() {
    return newUser.email === "" ||
      newUser.nickname === "" ||
      newUser.password === "" ||
      passwordConfirm === "" ||
      newUser.firstName === "" ||
      newUser.lastName === "" ||
      newUser.birthday === ""
      ? true
      : false;
  }

  const checkEmailInput = (e) => {
    let email = e.target.value;
    setNewUser({ ...newUser, email: email });
    const emailReg =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailReg.test(email)) {
      setEmailInputMessage({
        message: "Incorrect email",
        error: true,
      });
      setEmailPatternError(true);
      return;
    }
    setEmailInputMessage({
      message: "",
      error: false,
    });
    setEmailPatternError(false);
  };

  function checkPasswordSame() {
    if (newUser.password !== passwordConfirm) {
      setPasswordInputsMessage({
        message: "Passwords do not match",
        error: true,
      });
      return;
    }
    setPasswordInputsMessage({
      message: "",
      error: false,
    });
  }

  if (isCreating) return <Loader />;
  if (creatingError) return <Error error={creatingError} />;

  return (
    <form>
      <p className="input_message">{emptyInputsError}</p>
      <Input
        id="email"
        labelText="Email:"
        type="text"
        placeholder="Enter your email address"
        value={newUser.email}
        onChange={checkEmailInput}
        error={emailInputMessage.message}
      />
      <Input
        id="login"
        labelText="Nickname:"
        type="text"
        placeholder="Create a nickname"
        value={newUser.nickname}
        onChange={(e) => setNewUser({ ...newUser, nickname: e.target.value })}
        error={loginInputMessage.message}
      />
      <Input
        id="password"
        labelText="Password:"
        type="password"
        placeholder="Enter new password"
        value={newUser.password}
        onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
        error={passwordInputsMessage.message}
      />
      <Input
        id="passwordConfirm"
        labelText="Confirm password:"
        type="password"
        placeholder="Confirm new password"
        value={passwordConfirm}
        onChange={(e) => SetPasswordConfirm(e.target.value)}
        error={passwordInputsMessage.message}
      />
      <Input
        id="name"
        labelText="First name:"
        type="text"
        placeholder="Enter your name"
        value={newUser.firstName}
        onChange={(e) => setNewUser({ ...newUser, firstName: e.target.value })}
      />
      <Input
        id="surname"
        labelText="Last name:"
        type="text"
        placeholder="Enter your last name"
        value={newUser.lastName}
        onChange={(e) => setNewUser({ ...newUser, lastName: e.target.value })}
      />
      <Input
        id="birthday"
        labelText="Birthday:"
        type="date"
        value={newUser.birthday}
        onChange={(e) => setNewUser({ ...newUser, birthday: e.target.value })}
      />
      <div className="form-btn-container">
        <button onClick={register} onKeyDown={handleEnterEvent}>
          Sign up
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;
