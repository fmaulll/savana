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
import { RiExternalLinkLine } from "react-icons/ri";

const initialValue = {
  description: "",
  logo_url: "",
  logo_name: "",
  file: "",
  company: "",
  licence_number: "",
};

const initValueSection = {
  title: "",
  description: "",
  service_id: "",
};

const AboutUsDetail = () => {
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [aboutDetail, setAboutDetail] = useState(initialValue);
  const [sections, setSections] = useState([]);

  const handleAddSection = () => {
    const array = [...sections];
    array.push({ ...initValueSection, service_id: id });
    setSections(array);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase
      .from("services")
      .update({ description: aboutDetail.description })
      .eq("id", id);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setLoading(false);
    navigate(-1);
  };

  const getDescription = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select()
      .eq("id", id)
      .single();

    if (data) {
      setAboutDetail(data);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getDescription();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <input
            onChange={(e) => handleChange("file", e.target.files[0])}
            id="uploadHighlightF"
            type="file"
            className="hidden"
          />
          {aboutDetail.logo_url || aboutDetail.file ? (
            <div
              className={`mb-3 py-4 px-4 bg-[#D3D3D3] flex items-center rounded-lg w-min rounded-[4px] border-[#929292]`}
            >
              <FaRegTrashAlt
                className="mr-2 bg-red-500 rounded-full p-2 cursor-pointer"
                fill="white"
                size={32}
                onClick={handleDeletePhoto}
              />
              <span
                onClick={() => {
                  if (aboutDetail.logo_url) {
                    window.open(aboutDetail.logo_url);
                  }
                }}
                className={`text-[#7C7C7C] font-medium flex ${
                  aboutDetail.logo_url ? "cursor-pointer" : ""
                }`}
              >
                {aboutDetail.logo_url
                  ? aboutDetail.logo_name.slice(0, 16) + "..."
                  : aboutDetail.file.name.slice(0, 16) + "..."}{" "}
                {aboutDetail.logo_url && (
                  <RiExternalLinkLine size={24} className="ml-2" />
                )}
              </span>
            </div>
          ) : (
            <label htmlFor="uploadHighlightF">
              <div
                className={`mb-3 py-4 px-4 bg-[#D3D3D3] cursor-pointer flex items-center rounded-lg w-full rounded-[4px] border-[#929292]`}
              >
                <SlPaperClip className="mr-2" size={24} />
                <span className="text-[#7C7C7C] font-medium">
                  Logo Perusahaan
                </span>
              </div>
            </label>
          )}
          <Button type="orange">Submit</Button>
        </div>
        <div className="flex gap-4 mt-2">
          <Input type="text" placeholder="Nama Perusahaan" />
          <Input type="text" placeholder="No Lisence" />
        </div>
        <ReactQuill
          className="mt-4 mb-10"
          placeholder="Penjelasan Proyek"
          theme="snow"
          value={aboutDetail.description}
          onChange={(e) =>
            setAboutDetail((prev) => {
              return { ...prev, description: e };
            })
          }
        />
      </form>
      <div>
        <Button type="gray" onClick={handleAddSection}>
          Add Section
        </Button>
        {sections.map((item, index) => (
          <div className="mt-4">
            <p className="border-b border-[#D3D3D3] mb-4">Section {index + 1}</p>
            <Input type="text" placeholder="Judul" />
            <ReactQuill
              className="mt-4 mb-10"
              placeholder="Penjelasan Proyek"
              theme="snow"
              value={item.description}
              onChange={(e) => {
                const array = [...sections];
                array[index].description = e;
                setSections(array);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUsDetail;
