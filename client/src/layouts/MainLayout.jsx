import React, { useState } from 'react';
import { Outlet } from "react-router-dom";
import TitleBar from '../components/TitleBar';
import Sidebar from '../components/Sidebar';

const MainLayout = () => {
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <div className="h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-gray-100">

      {/* Sidebar (left column, full height) */}
      {showSidebar && (
        <div className="row-span-2 shadow-md z-10">
          <Sidebar />
        </div>
      )}

      {/* TitleBar (top right) */}
      <div className="col-start-2 row-start-1">
        <TitleBar setShowSidebar={setShowSidebar} />
      </div>

      {/* Main content area (below title bar, to the right of sidebar) */}
      <main className="col-start-2 row-start-2 overflow-y-auto p-0">
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
