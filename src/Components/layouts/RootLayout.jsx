import React from "react";
import Sidebar from "./sidebar";

function Layout({ children }) {
  return (
    <div>
      <div className="flex">
        <div className="sticky top-0 h-screen z-10">
          <Sidebar />
        </div>

        <main className="flex-1 mx-auto mt-20 overflow-y-auto">
          <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Layout;
