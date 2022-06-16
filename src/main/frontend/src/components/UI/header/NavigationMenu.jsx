import React from "react";

const NavigationMenu = () => {
  return (
    <div className="navigation__menu">
      <ul className="navigation__menu-list">
        <li className="navigatiom__menu-list__li">
          <a href="/" className="navigatiom__menu-list__li-link">Главная</a>
        </li>
        <li className="navigatiom__menu-list__li">
          <a href="/create" className="navigatiom__menu-list__li-link">Создать тему</a>
        </li>
        <li className="navigatiom__menu-list__li">
          <a href="/about" className="navigatiom__menu-list__li-link">Про форум</a>
        </li>
      </ul>
    </div>
  );
};

export default NavigationMenu;
