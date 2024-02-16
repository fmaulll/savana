import React, { useContext } from "react";
import SavanaLogo from "../../../assets/savanaLogo.png";
import { LuMenuSquare } from "react-icons/lu";
import { useLocation, useNavigate } from "react-router-dom";
import { LayoutContext } from "../../../context/LayoutContext";
import { supabase } from "../../../hooks/supabase";

const AuthorizedHeader = () => {
  const {
    loading,
    message,
    status,
    user,
    setUser,
    setMessage,
    setStatus,
    setLoading,
  } = useContext(LayoutContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
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

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error);
      setLoading(false);
      return;
    }

    setUser(null);
    navigate("/admin/login");
    setLoading(false);
    setMessage("Logout Success");
    setStatus(true);
    setTimeout(() => {
      setMessage("");
      setStatus(false);
    }, 1000);
  };

  return (
    <div className="flex flex-col fixed w-full">
      <div className="flex justify-between items-center h-[105px] bg-[#E6EDE9] px-9">
        <div className="flex items-center">
          <img src={SavanaLogo} alt="Savana Logo" />
          <h1 className="ml-4 text-xl font-semibold text-black">
            PT. SAVANA ANUGRAH LESTARI
          </h1>
        </div>
        <LuMenuSquare onClick={handleLogout} size={24} />
      </div>
      <div className="flex justify-center items-center h-[60px] bg-[#D9E3DE]">
        {pagename}
      </div>
    </div>
  );
};

export default AuthorizedHeader;
