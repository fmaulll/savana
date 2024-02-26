import React, { useContext, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../../hooks/supabase";
import { useEffect } from "react";
import { SlPaperClip } from "react-icons/sl";
import { FaRegTrashAlt } from "react-icons/fa";
import InputDate from "../../components/InputDate";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

const initialValue = {
  start_date: "",
  end_date: "",
  title: "",
  keyword: "",
  activity_type: "",
  location: "",
  client: "",
  description: "",
  service_id: "",
  image_url: "",
  file_name: "",
  file: "",
};

const AddEditProject = () => {
  const { type, service_id, id } = useParams();
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [dataRequest, setDataRequest] = useState(initialValue);
  const [documentation, setDocumentation] = useState([]);

  const handleClickDelete = (index) => {
    const array = [...documentation];
    array.splice(index, 1);
    setDocumentation(array);
  };

  const handleChange = (key, value) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleUploadDocumentation = async (file, projectId) => {
    const { data, error } = await supabase.storage
      .from("savana")
      .upload(`project-${projectId}/` + file.name + Date.now(), file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
  };

  const handleChangeDocumentation = async (file) => {
    setDocumentation((prev) => {
      return [...prev, file];
    });
  };

  const getPhotosUrl = (path) => {
    const { data } = supabase.storage.from("savana").getPublicUrl(path);

    return data.publicUrl;
  };

  const handleUploadHighlight = async (file) => {
    setLoading(true);

    const { data, error } = await supabase.storage
      .from("savana")
      .upload("project/" + file.name + Date.now(), file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      return {
        image_url: getPhotosUrl(data.path),
        file_name: file.name,
      };
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return {};
    }

    setLoading(false);
  };

  const handleDeletePhoto = () => {};

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataHit = {
      ...dataRequest,
      service_id: service_id,
      ...(await handleUploadHighlight(dataRequest.file)),
    };
    delete dataHit.file;

    const { data, error } = await supabase
      .from("projects")
      .insert(dataHit)
      .select()
      .single();

    if (data) {
      documentation.map((item) => {
        handleUploadDocumentation(item, data.id);
      });
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    navigate(-1);
    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex">
          <input
            onChange={(e) => handleChange("file", e.target.files[0])}
            id="uploadHighlightF"
            type="file"
            className="hidden"
          />
          <Button>Submit</Button>
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
            <label htmlFor="uploadHighlightF">
              <div
                className={`mb-3 py-4 px-4 bg-[#D3D3D3] cursor-pointer flex items-center rounded-lg w-full rounded-[4px] border-[#929292]`}
              >
                <SlPaperClip className="mr-2" size={24} />
                <span className="text-[#7C7C7C] font-medium">
                  Highlight Photo
                </span>
              </div>
            </label>
          )}
        </div>
        <div className="flex">
          <InputDate
            onChange={(e) => handleChange("start_date", e.target.value)}
            className="mr-4 w-[230px]"
            placeholder="Mulai"
          />
          <InputDate
            onChange={(e) => handleChange("end_date", e.target.value)}
            className="w-[230px]"
            placeholder="Selesai"
          />
        </div>
        <Input
          onChange={(e) => handleChange("title", e.target.value)}
          className="mt-4"
          type="text"
          placeholder="Judul"
        />
        <Input
          onChange={(e) => handleChange("keyword", e.target.value)}
          className="mt-4"
          type="text"
          placeholder="Kata Kunci"
        />
        <div className="flex gap-4 mt-4">
          <Input
            onChange={(e) => handleChange("activity_type", e.target.value)}
            type="text"
            placeholder="Jenis Kegiatan"
          />
          <Input
            onChange={(e) => handleChange("location", e.target.value)}
            type="text"
            placeholder="Lokasi"
          />
        </div>
        <Input
          onChange={(e) => handleChange("client", e.target.value)}
          className="mt-4"
          type="text"
          placeholder="Klien"
        />

        <div className="w-full mt-4">
          <span className="font-medium">Masukan Foto Dokumentasi</span>
          <div className="mt-4 h-[306px] w-full border border-[#929292] flex justify-center items-center border-dashed">
            <div className="grid grid-cols-5 w-full">
              {documentation.map((item, index) => (
                <div
                  key={index}
                  className="relative border w-full h-[200px] flex justify-center items-center"
                >
                  <span>{item.name}</span>
                  <div
                    className="absolute top-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer"
                    onClick={() => handleClickDelete(index)}
                  >
                    <FaRegTrashAlt fill="white" />
                  </div>
                </div>
              ))}
              <label className="cursor-pointer" htmlFor="uploadDocumentation">
                <div className="border w-full h-[200px] flex justify-center items-center hover:bg-gray-300">
                  <MdOutlineAddPhotoAlternate size={48} />
                </div>
              </label>
            </div>
          </div>
          <input
            onChange={(e) => handleChangeDocumentation(e.target.files[0])}
            id="uploadDocumentation"
            type="file"
            className="hidden"
          />
        </div>
        <ReactQuill
          className="mt-4 mb-10"
          placeholder="Penjelasan Proyek"
          theme="snow"
          value={dataRequest.description}
          onChange={(e) => handleChange("description", e)}
        />
      </form>
    </div>
  );
};

export default AddEditProject;
