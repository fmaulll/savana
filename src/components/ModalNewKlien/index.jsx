import React from "react";
import OutsideWrapper from "../OutsideWrapper";
import { SlPaperClip } from "react-icons/sl";
import { FaRegTrashAlt } from "react-icons/fa";
import Input from "../Input";
import Button from "../Button";
import { useState } from "react";

const ModalNewKlien = ({ onClose, onSubmit }) => {
  const [dataRequest, setDataRequest] = useState({ name: "", file: "" });

  const handleDeletePhoto = () => {
    setDataRequest((prev) => {
      return {
        ...prev,
        file: "",
      };
    });
  };

  const handleChange = (key, value) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!dataRequest.name || !dataRequest.file) {
      return;
    }
    onSubmit(dataRequest);
    onClose();
  };

  return (
    <div className="h-screen bg-[rgba(0,0,0,0.6)] w-full top-0 left-0 fixed flex justify-center items-center z-50">
      <OutsideWrapper callback={onClose}>
        <form
          onSubmit={handleSubmit}
          className="bg-[#004723] rounded-xl flex justify-start items-center flex-col p-3 min-w-[314px]"
        >
          <div className="bg-white p-3 w-full rounded-lg">
            {dataRequest.file ? (
              <div
                className={`mb-3 py-4 px-4 bg-[#D3D3D3] flex items-center rounded-lg w-full rounded-[4px] border-[#929292]`}
              >
                <FaRegTrashAlt
                  className="mr-2 bg-red-500 rounded-full p-2 cursor-pointer"
                  fill="white"
                  size={32}
                  onClick={handleDeletePhoto}
                />
                <span className="text-[#7C7C7C] font-medium">
                  {dataRequest.file.name.slice(0, 16) + "..."}
                </span>
              </div>
            ) : (
              <label htmlFor="inputPhotoClient">
                <div
                  className={`mb-3 py-4 px-4 bg-[#D3D3D3] cursor-pointer flex items-center rounded-lg w-full rounded-[4px] border-[#929292]`}
                >
                  <SlPaperClip className="mr-2" size={24} />
                  <span className="text-[#7C7C7C] font-medium">
                    Logo Perusahaan Klien
                  </span>
                </div>
              </label>
            )}
            <input
              onChange={(e) => handleChange("file", e.target.files[0])}
              id="inputPhotoClient"
              type="file"
              className="hidden"
            />
            <label
              htmlFor="inputClientName"
              className="text-[#7C7C7C] font-medium"
            >
              Nama Perusahaan Klien
            </label>
            <Input
              placeholder="Type here"
              id="inputClientName"
              type="text"
              className="mt-2"
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <Button disabled={!dataRequest.name || !dataRequest.file} className="w-full py-4 mt-2.5">Add</Button>
        </form>
      </OutsideWrapper>
    </div>
  );
};

export default ModalNewKlien;
