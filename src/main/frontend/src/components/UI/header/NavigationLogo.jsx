import React from "react";
import logo from "../../../img/logo/logo.svg";

const NavigationLogo = () => {
  return (
    <div className="navigation__logo">
      <a href="/">
        <img src={logo} className="logo" alt="nice-forum" />
      </a>
    </div>
  );
};

export default NavigationLogo;
