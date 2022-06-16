import React from "react";
import MobileMenu from "./MobileMenu";
import SearchMenu from "./SearchMenu";
import UserMenu from "./UserMenu";

const NavigationButtons = () => {
  return (
    <div className="navigation__btns">
      <MobileMenu />
      <SearchMenu />
      <UserMenu />
    </div>
  );
};

export default NavigationButtons;
