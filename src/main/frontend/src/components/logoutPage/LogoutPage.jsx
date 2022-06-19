import React from "react";
import { Navigate } from "react-router-dom";

const LogoutPage = () => {
  sessionStorage.removeItem("jwt");
  sessionStorage.removeItem("currentUser");
  sessionStorage.removeItem("isAuth");

  return <Navigate to={"/"} replace={true} />;
};

export default LogoutPage;
