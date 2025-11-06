import React from 'react';
import './Header.css';

const Header = ({ title, subtitle }) => {
  return (
    <header className="header">
      <div className="header__content">
        <div className="header__title-section">
          <h1 className="header__title">{title}</h1>
          {subtitle && <p className="header__subtitle">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
};

export default Header;
