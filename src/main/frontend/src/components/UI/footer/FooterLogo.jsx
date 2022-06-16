import React from "react";
import logo from "../../../img/logo/footer_logo.svg";

const FooterLogo = () => {
  return (
    <div className="footer__logo">
      <a href="/">
        <img src={logo} className="logo" alt="Nice-Forum" />
      </a>
    </div>
  );
};

export default FooterLogo;
