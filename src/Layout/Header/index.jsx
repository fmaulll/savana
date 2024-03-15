import React, { useContext, useEffect, useState } from "react";
import SavanaLogo from "../../assets/savanaLogo.png";
import IndonesiaFlag from "../../assets/indonesiaFlag.png";
import { Link, useNavigate } from "react-router-dom";
import { FaChevronDown } from "react-icons/fa";
import wording from "../../wording.json";
import { LayoutContext } from "../../context/LayoutContext";
import { LuMenuSquare } from "react-icons/lu";
import OutsideWrapper from "../../components/OutsideWrapper";

const Header = () => {
  const navigate = useNavigate();
  const { language, setLanguage } = useContext(LayoutContext);
  const [scrolling, setScrolling] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

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
    return window.location.pathname.includes(path);
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
      title: "Pelayanan",
      path: "/services",
    },
    {
      title: "Artikel",
      path: "/article",
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
        !isOpen && !scrolling && window.location.pathname === "/"
          ? ""
          : "bg-white"
      } z-10`}
    >
      <div className="w-full flex justify-between items-center px-[30px] md:px-[110px]">
        <img
          className="cursor-pointer w-[50px] md:w-max"
          onClick={() => handleRouting("/")}
          src={SavanaLogo}
          alt="Savana Logo"
        />
        <div className="flex hidden md:flex">
          {navigation.map((nav, index) => (
            <Link
              // onClick={() => handleRouting(nav.path)}
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
            </Link>
          ))}
        </div>

        <div
          className={`hidden md:flex border-2 rounded-[24px] py-3 px-6 text-lg font-bold cursor-pointer ${
            !scrolling && window.location.pathname === "/"
              ? "bg-transparent border-white text-white"
              : "bg-white border-[#00391C] text-[#00391C]"
          }`}
        >
          Kontak Kami
        </div>
        {/* <div className={`hidden md:flex border-2 rounded-[24px] py-3 px-6 text-lg font-bold cursor-pointer ${!scrolling && window.location.pathname === "/" ? "bg-transparent border-white text-white" : "bg-white border-[#00391C] text-[#00391C]"}`}>Kontak Kami</div> */}
        <LuMenuSquare
          onClick={() => setIsOpen(!isOpen)}
          size={24}
          className={`${
            !isOpen && !scrolling && window.location.pathname === "/"
              ? "text-white"
              : "text-[#002B15]"
          }`}
        />
      </div>
      {isOpen && (
        <OutsideWrapper callback={() => setIsOpen(!isOpen)}>
          <div
            className={`w-full py-[18px] drop-shadow-lg fixed ${
              !isOpen && !scrolling && window.location.pathname === "/"
                ? ""
                : "bg-white"
            } z-10`}
          >
            {navigation.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className={`py-3 px-6 text-lg font-bold cursor-pointer ${
                  !isOpen && !scrolling && window.location.pathname === "/"
                    ? "bg-transparent border-white text-white"
                    : "bg-white border-[#00391C] text-[#00391C]"
                }`}
              >
                {item.title}
              </div>
            ))}
          </div>
        </OutsideWrapper>
      )}
    </div>
  );
};

export default Header;
