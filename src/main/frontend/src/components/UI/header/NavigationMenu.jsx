import React from "react";

const NavigationMenu = () => {
  return (
    <div className="navigation__menu">
      <ul className="navigation__menu-list">
        <li className="navigatiom__menu-list__li">
          <a href="/" className="navigatiom__menu-list__li-link">Home</a>
        </li>
        <li className="navigatiom__menu-list__li">
          <a href="/create" className="navigatiom__menu-list__li-link">Create topic</a>
        </li>
        <li className="navigatiom__menu-list__li">
          <a href="/about" className="navigatiom__menu-list__li-link">About</a>
        </li>
      </ul>
    </div>
  );
};

export default NavigationMenu;
