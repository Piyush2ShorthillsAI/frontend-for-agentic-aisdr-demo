import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import './Layout.css';

const Layout = ({ children, title, subtitle }) => {
  return (
    <div className="layout">
      <Sidebar />
      <div className="layout__main">
        <Header title={title} subtitle={subtitle} />
        <main className="layout__content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
