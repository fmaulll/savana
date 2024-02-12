import React, { useContext, useEffect, useState } from "react";
import SavanaLogo from "../../assets/savanaLogo.png";
import IndonesiaFlag from "../../assets/indonesiaFlag.png";
import { useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import wording from "../../wording.json";
import { LayoutContext } from "../../context/LayoutContext";

const Header = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LayoutContext);
  const [scrolling, setScrolling] = useState(false);

  // Function to handle scroll events
  const handleScroll = () => {
    // console.log(window.scrollY)
    if (window.scrollY > 10) {
      setScrolling(true);
    } else {
      setScrolling(false);
    }
  };

  const handleRouting = (path) => {
    navigate(path);
  };

  const handleActiveNav = (path) => {
    return path === window.location.pathname;
  };

  const handleLanguage = () => {
    setLanguage(language === "ID" ? "EN" : "ID");
  };

  // Add scroll event listener when the component mounts
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navigation = [
    {
      title: wording[language].nav.markets,
      path: "/markets",
    },
    {
      title: wording[language].nav.news,
      path: "/news",
    },
    {
      title: wording[language].nav.career,
      path: "/career",
    },
    {
      title: wording[language].nav.about,
      path: "/about",
    },
  ];

  return (
    <div
      className={`w-full py-[18px] drop-shadow-lg fixed ${
        !scrolling && window.location.pathname === "/" ? "" : "bg-white"
      } z-10`}
    >
      {/* <div className="flex justify-end px-[30px] md:px-[100px] hidden md:flex">
        <div className="py-3 px-6 rounded-full bg-[#DADADA] flex items-center relative group">
          <img className="mr-3" src={IndonesiaFlag} alt="Indonesian flag" />
          {language === "ID" ? "Indonesia" : "English"}
          <FaChevronDown className="ml-3 bg-transparent" />
          <div onClick={handleLanguage} className="w-full py-3 px-6 rounded-full bg-[#DADADA] flex items-center absolute group-hover:visible invisible mt-[98px] left-0 cursor-pointer">
            <img className="mr-3" src={IndonesiaFlag} alt="Indonesian flag" />
            {language === "ID" ? "English" : "Indonesia"}
          </div>
        </div>
      </div> */}
      <div className="w-full flex justify-between items-center px-[30px] md:px-[100px]">
        <img
          className="cursor-pointer"
          onClick={() => handleRouting("/")}
          src={SavanaLogo}
          alt="Savana Logo"
        />
        <div className="flex hidden md:flex">
          {navigation.map((nav, index) => (
            <div
              onClick={() => handleRouting(nav.path)}
              className={`ml-[50px] font-semibold ${
                handleActiveNav(nav.path) && "text-[#FFB66B]"
              } cursor-pointer text-xl ${
                !scrolling && window.location.pathname === "/" && "text-white"
              } ${
                scrolling &&
                window.location.pathname === "/" &&
                "text-[#004723]"
              }`}
              to={nav.path}
              key={index}
            >
              {nav.title}
            </div>
          ))}
        </div>

        <div className={`border-2 rounded-[24px] py-3 px-6 text-lg font-bold cursor-pointer ${!scrolling && window.location.pathname === "/" ? "bg-transparent border-white text-white" : "bg-white border-[#00391C] text-[#00391C]"}`}>Kontak Kami</div>
      </div>
    </div>
  );
};

export default Header;
