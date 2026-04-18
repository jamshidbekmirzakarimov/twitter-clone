import React from 'react';
import SidebarLeft from './SidebarLeft';
import SidebarRight from './SidebarRight';

const Layout = ({ children }) => {
    return (
        <div className="layout-container">
            <SidebarLeft />
            <main className="main-content">
                {children}
            </main>
            <SidebarRight />
        </div>
    );
};

export default Layout;
