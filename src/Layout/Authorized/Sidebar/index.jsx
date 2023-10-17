import React, { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useDate } from "../../../hooks/useDate";

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
    </div>
  );
};

export default AuthorizedSidebar;
