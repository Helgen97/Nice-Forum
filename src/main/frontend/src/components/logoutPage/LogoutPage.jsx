import React from "react";
import { Navigate } from "react-router-dom";

const LogoutPage = () => {
  localStorage.removeItem("jwt");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("isAuth");
  localStorage.removeItem("tokenExpirationDate")

  return <Navigate to={"/"} replace={true} />;
};

export default LogoutPage;
