import React from "react";

const Button = ({ children, onClick, type, className }) => {
  let btnType = "bg-white"
  if (type === "gray") {
    btnType = "bg-[#D9E3DE] hover:bg-[#b6bfba]"
  }
  if (type === "orange") {
    btnType = "bg-[#ffa140] hover:bg-[#FFB66B] text-white"
  }
  return <button className={`${btnType} font-semibold py-4 px-[25px] rounded-lg border-none outline-none w-full ${className}`} onClick={onClick}>{children}</button>;
};

export default Button;
