import React, { Fragment, useRef, useState } from "react";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Input = ({ placeholder, type, onChange }) => {
  const inputRef = useRef(null);
  const [show, setShow] = useState(false);

  const handleClickShow = () => {
    setShow(!show);
  };

  return (
    <div
      onClick={() => inputRef.current.focus()}
      className="py-4 px-6 bg-white flex justify-between items-center rounded-lg w-[314px]"
    >
      <input
        className="border-none outline-none focus:outline-none focus:border-none bg-white text-sm"
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
