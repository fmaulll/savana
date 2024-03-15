import React from "react";
import { GiCancel } from "react-icons/gi";
import { useNavigate } from "react-router-dom";

const BackHeader = () => {
  const navigate = useNavigate();
  return (
    <div
      className={`w-full h-[122px] drop-shadow-lg fixed bg-black/50 z-10 flex justify-between items-center px-[30px] md:px-[110px]`}
    >
      <GiCancel
        className="cursor-pointer"
        fill="white"
        size={52}
        onClick={() => navigate(-1)}
      />
    </div>
  );
};

export default BackHeader;
