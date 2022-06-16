import React, { useState } from "react";
import { useFetching } from "../../hooks/useFetching";
import { useNavigate } from "react-router-dom";
import LoginService from "../../API/LoginService";
import Input from "../UI/input/Input";
import MetaTags from "../UI/meta/MetaTags";
import Loader from "../UI/loader/Loader";
import Error from "../UI/errorBanner/Error";

const LoginPage = () => {
  const navigate = useNavigate();
  const tokenExpireTime = 86400000;

  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");

  const [getCurrentUser, isLoading, gettingCurrentUserError] = useFetching(
    async () => {
      const currentUser = await LoginService.getCurrentUser();
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/", { replace: true });
    }
  );

  function login(e) {
    e.preventDefault();
    setError("");

    if (checkInputsEmpty()) {
      setError("Заполните пустые поля!");
      return;
    }
    setError("");

    LoginService.login(user)
      .then((result) => {
        const jwtToken = result.headers.authorization;

        if (jwtToken !== null) {
          localStorage.setItem("jwt", jwtToken);
          localStorage.setItem("isAuth", true);
          localStorage.setItem(
            "tokenExpirationDate",
            new Date(Date.now() + tokenExpireTime)
          );
          getCurrentUser();
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Неправильные логин или пароль");
      });
  }

  function checkInputsEmpty() {
    return user.username === "" || user.password === "" ? true : false;
  }

  if (isLoading) return <Loader />;
  if (gettingCurrentUserError) return <Error error={gettingCurrentUserError} />;

  return (
    <main className="login-page">
      <MetaTags
        title={"Авторизация - Nice Forum - форум приятного общения!"}
        description={
          "Авторизация на форум. Войдите в свой профиль и начните общение."
        }
        keywords={"Форум, общение, разделы, дружба, вход, авторизация"}
      />
        <div className="form">
          <div className="form__title">
            <h2>Авторизация</h2>
          </div>
          <form>
            <Input
              id="username"
              labelText="Эмейл или логин"
              type="text"
              placeholder="Введите ваш логин или почту"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              error={error}
            />
            <Input
              id="password"
              labelText="Пароль:"
              type="password"
              placeholder="Введите пароль"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="form-btn-container">
              <button onClick={login}>Войти</button>
            </div>
          </form>
        </div>
    </main>
  );
};

export default LoginPage;
