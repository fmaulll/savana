import React from "react";
import Input from "../Input";
import ReactQuill from "react-quill";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

const Section = ({data, index, number, handleChange, handleDeleteExistingDocumentation, handleClickDelete, handleChangeDocumentation}) => {
  return (
    <div className="mt-4">
      <p className="border-b border-[#D3D3D3] mb-4">Section {number}</p>
      <Input value={data.title} type="text" placeholder="Judul" onChange={(e) => handleChange("title", e.target.value, index)} />
      <ReactQuill
        className="mt-4 mb-10"
        placeholder="Penjelasan Proyek"
        theme="snow"
        value={data.description}
        onChange={(e) => handleChange("description", e, index)}
      />

      <div className="w-full mt-4">
        <span className="font-medium">Masukan Foto Dokumentasi</span>
        <div className="mt-4 h-min-[306px] w-full border border-[#929292] flex justify-center items-center border-dashed">
          <div className="grid grid-cols-5 w-full">
            {data.dataDocumentation.map((doc, idx) => (
              <div
                key={idx}
                className="relative border w-full h-[200px] flex justify-center items-center"
              >
                <img
                  className="object-fill h-full cursor-pointer"
                  src={doc.url}
                  alt={doc.name}
                  onClick={() => window.open(doc.url)}
                />
                <div
                  className="absolute top-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer"
                  onClick={() => handleDeleteExistingDocumentation(idx, id)}
                >
                  <FaRegTrashAlt fill="white" />
                </div>
              </div>
            ))}
            {data.documentation.map((doc, idx) => (
              <div
                key={idx}
                className="relative border w-full h-[200px] flex justify-center items-center"
              >
                <span>{doc.name}</span>
                <div
                  className="absolute top-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer"
                  onClick={() => handleClickDelete(idx)}
                >
                  <FaRegTrashAlt fill="white" />
                </div>
              </div>
            ))}
            <label
              className="cursor-pointer"
              htmlFor={`uploadDocumentation-${index}`}
            >
              <div className="border w-full h-[200px] flex justify-center items-center hover:bg-gray-300">
                <MdOutlineAddPhotoAlternate size={48} />
              </div>
            </label>
          </div>
        </div>
        <input
          key={index}
          onChange={(e) => {
            handleChangeDocumentation(e.target.files[0], index);
          }}
          id={`uploadDocumentation-${index}`}
          type="file"
          className="hidden"
        />
      </div>
    </div>
  );
};

export default Section;
