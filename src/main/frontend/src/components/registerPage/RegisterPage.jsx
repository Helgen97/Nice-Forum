import React from "react";
import RegisterForm from "./RegisterForm";
import MetaTags from "../UI/meta/MetaTags";

const RegisterPage = () => {
  return (
    <main className="registration-page">
      <MetaTags
        title={"Регистрация - Nice Forum - форум приятного общения!"}
        description={
          "Регистрация на форум. Создай свой профиль и начните общение, поделись новостями и заведи друзей"
        }
        keywords={"Форум, общение, разделы, дружба, вход, авторизация"}
      />
        <div className="form">
          <div className="form__title">
            <h2>Регистрация</h2>
          </div>
          <RegisterForm />
        </div>
    </main>
  );
};

export default RegisterPage;
