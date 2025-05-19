import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = () => {
  return (
    // <div className="flex h-screen">
    //   {/* <Sidebar /> */}
    //   <div className="flex-1 flex flex-col">
    //     <Header />
    //     <main className="flex-grow p-1 overflow-y-auto">
    //     </main>
    //   </div>
    // </div>
    <div className="h-screen overflow-y-auto bg-[#121212] text-white">
       <Header />
         <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <Sidebar/>
                <Outlet />

</div>
    </div>
  );
};

export default Layout;
