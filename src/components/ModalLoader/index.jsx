import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const ModalLoader = () => {
  return (
    <div data-testid="loader" className="z-50 h-screen bg-[rgba(0,0,0,0.6)] w-full top-0 left-0 fixed flex justify-center items-center">
      <div className="flex justify-center items-center flex-col bg-white p-4 rounded-xl">
        <AiOutlineLoading3Quarters className="animate-spin" size={30} />{" "}
        Loading...
      </div>
    </div>
  );
};

export default ModalLoader;