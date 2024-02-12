import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMinusSquare } from "react-icons/fa";
import { RiTeamFill } from "react-icons/ri";
import { MdHomeRepairService } from "react-icons/md";
import { AiFillDashboard } from "react-icons/ai";
import { BsInfoCircleFill } from "react-icons/bs";
import { useDate } from "../../../hooks/useDate";

const navigation = [
  {label: "Dashboard", icon: <AiFillDashboard size={36} />, path: "/admin/dashboard"},
  {label: "Pelayanan", icon: <MdHomeRepairService size={36} />, path: "/admin/pelayanan"},
  {label: "Karir", icon: <RiTeamFill size={36} />, path: "/admin/karir"},
  {label: "About Us", icon: <BsInfoCircleFill size={36} />, path: "/admin/about"},
]

const AuthorizedSidebar = () => {
  let time = new Date().toLocaleTimeString();

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString();
    setTime(time);
  };
  setInterval(UpdateTime);
  return (
    <div className="bg-[#B0C6BB] h-[calc(100vh-165px)] mt-[165px] fixed w-[270px]">
      <div className="bg-[#D9E3DE] px-9 my-2 py-4">
        <div className="text-[32px] font-medium">{ctime}</div>
        <div className="flex items-center font-medium pt-3">
          <FaCalendarAlt className="mr-3" size={16} />
          {useDate()}
        </div>
      </div>
      <div className="bg-[#D9E3DE] px-9 my-2 py-4 flex justify-between items-center">
        <span className="font-medium">Menu Navigasi</span>
        <FaMinusSquare />
      </div>
      <div className="bg-[#D9E3DE] my-2 py-4">
        {navigation.map((item, index) => (
          <div key={index} className="flex items-center px-[30px] py-[24px] cursor-pointer hover:bg-gray-700">
            {item.icon} 
            <span className="ml-[48px] font-medium">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AuthorizedSidebar;
