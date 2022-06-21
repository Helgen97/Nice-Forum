import React from "react";
import RegisterForm from "./RegisterForm";
import MetaTags from "../UI/meta/MetaTags";

const RegisterPage = () => {
  return (
    <main className="registration-page">
      <MetaTags
        title={"Sign up - Nice Forum - Forum of Nice Communication!"}
        description={
          "Want to become part of our community? Here you go! Forum sign up. Create your profile and start chatting, share news and find new friends"
        }
        keywords={"Forum, speaking, sections, friendship, registration, sign up"}
      />
        <div className="form">
          <div className="form__title">
            <h2>Sign up</h2>
          </div>
          <RegisterForm />
        </div>
    </main>
  );
};

export default RegisterPage;
