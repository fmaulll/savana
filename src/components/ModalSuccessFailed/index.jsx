import React from "react";
import OutsideWrapper from "../OutsideWrapper";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const ModalSuccessFailed = ({ status, message, onClose }) => {
  return (
    <div className="h-screen bg-[rgba(0,0,0,0.6)] w-full top-0 left-0 fixed flex justify-center items-center z-50">
      <OutsideWrapper callback={onClose}>
        <div className="bg-white rounded-xl flex justify-start items-center flex-col p-8 min-w-[500px] h-[450px]">
          <h1 className="text-4xl font-bold">{status ? "Success" : "Failed"}</h1>
          <p className="mt-8">{message}</p>
          {status ? (
            <FaCheckCircle className="mt-8" fill={"#32a852"} size={180} />
          ) : (
            <FaTimesCircle className="mt-8" fill={"red"} size={180} />
          )}
        </div>
      </OutsideWrapper>
    </div>
  );
};

export default ModalSuccessFailed;