import React, { Fragment, useRef, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Input = ({ placeholder, type, onChange, className, ...other }) => {
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleClickShow = () => {
    setShow(!show);
  };

  return (
    <div
      onClick={() => inputRef.current.focus()}
      className={`${className} py-2 px-3 bg-white flex justify-between items-center rounded w-full border rounded-[4px] border-[#929292]`}
    >
      <input
        {...other}
        className="border-none border-transparent focus:border-transparent focus:ring-0 bg-white text-sm w-full"
        ref={inputRef}
        type={show && type === "password" ? "text" : type}
        placeholder={placeholder}
        onChange={onChange}
      />
      {type === "password" ? (
        <div className="cursor-pointer" onClick={handleClickShow}>
          {show ? (
            <AiOutlineEyeInvisible size={24} />
          ) : (
            <AiOutlineEye size={24} />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Input;
