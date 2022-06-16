import React from "react";
import NavigationButtons from "./NavigationButtons";
import NavigationLogo from "./NavigationLogo";
import NavigationMenu from "./NavigationMenu";

const Header = () => {
  return (
    <header className="navigation">
        <NavigationLogo />
        <NavigationMenu />
        <NavigationButtons />
    </header>
  );
};

export default Header;
