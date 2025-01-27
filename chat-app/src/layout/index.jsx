import React from "react";
import { Outlet } from "react-router-dom";
import SlideBar from "./Slidebar";

function index() {
  return (
    <div className="h-[calc(100vh)] overflow-hidden sm:h-screen">
      <div className="h-full rounded-sm border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark xl:flex">
        {/* SlideBar */}
        <SlideBar />
        <Outlet />
      </div>
    </div>
  );
}

export default index;
