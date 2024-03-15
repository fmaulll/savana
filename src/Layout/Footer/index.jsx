import React, { useContext } from "react";
import SavanaLogo from "../../assets/savanaBig.png";
import wording from "../../wording.json";
import { LayoutContext } from "../../context/LayoutContext";
import { FaArrowRight } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

const Footer = () => {
  const { language } = useContext(LayoutContext);

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
    <div className="">
      <div className="bg-[#004723] px-[30px] md:px-[150px] flex justify-between items-center md:flex-row flex-col-reverse md:py-16 py-8">
        <div className="flex flex-col mt-6">
          <img
            className="w-[103px] md:w-[175px] md:h-[140px] mr-[116px]"
            src={SavanaLogo}
            alt=""
          />
          <p className="text-white text-xs md:text-[18px] font-bold mt-4">
            Jl. Katelia Raya No. 8, RT.02/RW.09, Cilendek Timur, Kecamatan Bogor
            Barat,<br/> Kota Bogor, Jawa Barat, Indonesia<br/> 16112
          </p>
          <p className="text-white text-xs md:text-[18px] font-bold mt-4">Kontak Kami</p>
          <div className="[&>*]:text-white md:[&>*]:text-[18px] [&>*]:text-xs [&>*]:font-semibold mt-4">
            <div className="flex items-center">
              <HiMail fill="white" className="mr-3" />
              savanalestari08@gmail.com
            </div>
          </div>
        </div>
        {/* <div className="[&>*]:text-white [&>*]:text-[18px] [&>*]:font-semibold"> */}
        <div className="w-[326px]">
          {navigation.map((nav, index) => (
            <div
              key={index}
              className="flex justify-between border-b-2 border-white font-semibold text-xs md:text-[18px] text-white py-3 pb-1"
            >
              {nav.title} <FaArrowRight fill="white" />
            </div>
          ))}
          {/* </div> */}
        </div>
      </div>
      <div className="bg-[#002B15] py-[18px] text-[10px] text-center md:text-sm font-normal text-white flex justify-center items-center">
        Copyright PT. Savana Anugerah lestari 2023. All Right Reserved
      </div>
    </div>
  );
};

export default Footer;
