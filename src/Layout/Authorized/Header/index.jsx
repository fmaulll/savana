import React from "react";
import SavanaLogo from "../../../assets/savanaLogo.png";
import { LuMenuSquare } from "react-icons/lu";
import { useLocation } from "react-router-dom";

const AuthorizedHeader = () => {
  const { pathname } = useLocation();
  let pagename = "";

  if (pathname === "/admin/dashboard") {
    pagename = "Dashboard";
  } else if (pathname === "/admin/pelayanan") {
    pagename = "Pelayanan";
  } else if (pathname === "/admin/karir") {
    pagename = "Karir";
  } else if (pathname === "/admin/about") {
    pagename = "Abous Us";
  }
  return (
    <div className="flex flex-col fixed w-full">
      <div className="flex justify-between items-center h-[105px] bg-[#E6EDE9] px-9">
        <div className="flex items-center">
          <img src={SavanaLogo} alt="Savana Logo" />
          <h1 className="ml-4 text-xl font-semibold text-black">PT. SAVANA ANUGRAH LESTARI</h1>
        </div>
        <LuMenuSquare size={24} />
      </div>
      <div className="flex justify-center items-center h-[60px] bg-[#D9E3DE]">
        {pagename}
      </div>
    </div>
  );
};

export default AuthorizedHeader;
