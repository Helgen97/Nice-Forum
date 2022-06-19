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
      sessionStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/", { replace: true });
    }
  );

  function login(e) {
    e.preventDefault();
    setError("");

    if (checkInputsEmpty()) {
      setError("Fill in the empty fields!");
      return;
    }
    setError("");

    LoginService.login(user)
      .then((result) => {
        const jwtToken = result.headers.authorization;

        if (jwtToken !== null) {
          sessionStorage.setItem("jwt", jwtToken);
          sessionStorage.setItem("isAuth", true);
          getCurrentUser();
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Bad login or password");
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
        title={"Sign in - Nice Forum - Forum of Nice Communication!"}
        description={
          "Nice-Forum sign in. Sign into your profile and start chatting."
        }
        keywords={"Forum, speaking, sections, friendship, sign in, authorisation"}
      />
        <div className="form">
          <div className="form__title">
            <h2>Sign in</h2>
          </div>
          <form>
            <Input
              id="username"
              labelText="Email or login"
              type="text"
              placeholder="Enter your login or email"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              error={error}
            />
            <Input
              id="password"
              labelText="Password:"
              type="password"
              placeholder="Enter password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
            <div className="form-btn-container">
              <button onClick={login}>Sign in</button>
            </div>
          </form>
        </div>
    </main>
  );
};

export default LoginPage;
