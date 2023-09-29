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
    <div className="bg-red-500 h-[calc(100vh-165px)] mt-[165px] fixed w-[270px]">
      <div>{ctime}</div>
      <div>
        <FaCalendarAlt />
        {useDate()}
      </div>
    </div>
  );
};

export default AuthorizedSidebar;
