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
import { getPhotosUrl } from "../../hooks/getUrl";
import Section from "../../components/Section";

const initialValue = {
  description: "",
  logo_url: "",
  logo_name: "",
  file: "",
  company: "",
  licence_number: "",
};

const initValueSection = {
  id: "",
  title: "",
  description: "",
  service_id: "",
  dataDocumentation: [],
  documentation: [],
  deletedDocumentation: [],
};

const AboutUsDetail = () => {
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [aboutDetail, setAboutDetail] = useState(initialValue);
  const [sections, setSections] = useState([]);
  const [deletedSections, setDeletedSections] = useState([]);

  const handleChangeDetail = (key, value) => {
    setAboutDetail((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const handleDeletePhoto = () => {
    setDataRequest((prev) => {
      return {
        ...prev,
        image_url: "",
        file: "",
      };
    });
  };

  const handleChange = (key, value, index) => {
    const array = [...sections];
    array[index][key] = value;
    setSections(array);
  };

  const deleteImage = async (images) => {
    const { data, error } = await supabase.storage
      .from("avatars")
      .remove(["folder/avatar1.png"]);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
  };

  const uploadImage = async (file, sectionId) => {
    const { data, error } = await supabase.storage
      .from("savana")
      .upload(`section-${sectionId}/` + file.name + Date.now(), file, {
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

  const insertSection = async (type, givenData) => {
    setLoading(true);
    if (type === "new") {
      const dataRequest = {
        title: givenData.title,
        description: givenData.description,
        service_id: givenData.service_id,
      };
      const { data, error } = await supabase
        .from("sections")
        .insert(dataRequest)
        .select()
        .single();

      if (data) {
        givenData.documentation.map((item) => {
          uploadImage(item, data.id);
        });
      }

      if (error) {
        setLoading(false);
        setMessage(error.message);
        setStatus(false);
        return;
      }
    } else {
      const dataRequest = {
        title: givenData.title,
        description: givenData.description,
        service_id: givenData.service_id,
      };
      const { data, error } = await supabase
        .from("sections")
        .update(dataRequest)
        .eq("section_id", givenData.service_id)
        .select();

      if (data) {
        givenData.documentation.map((item) => {
          uploadImage(item, data.id);
        });
        deleteImage(givenData.deletedDocumentation);
      }

      if (error) {
        setLoading(false);
        setMessage(error.message);
        setStatus(false);
        return;
      }
    }
    setLoading(false);
  };

  const uploadLogo = async (file) => {
    const { data, error } = await supabase.storage
      .from("savana")
      .upload(`logo/` + file.name + Date.now(), file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data.path) {
      return {
        logo_url: data.path ? getPhotosUrl(data.path) : "",
        logo_name: file.name,
      };
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return {};
    }

    return {};
  };

  const handleDeleteExistingDocumentation = () => {};

  const handleClickDelete = () => {};

  const handleChangeDocumentation = (file, index) => {
    console.log(index);
    const array = [...sections];
    array[index].documentation.push(file);
    setSections(array);
  };

  const handleAddSection = () => {
    const array = [...sections];
    array.push({
      id: "",
      title: "",
      description: "",
      service_id: id,
      dataDocumentation: [],
      documentation: [],
      deletedDocumentation: [],
    });
    setSections(array);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let dataRequest = { ...aboutDetail };

    if (aboutDetail.file) {
      dataRequest = { ...dataRequest, ...(await uploadLogo(aboutDetail.file)) };
    }

    delete dataRequest.id;
    delete dataRequest.file;

    const { error } = await supabase
      .from("services")
      .update(dataRequest)
      .eq("id", id);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    sections.map((item) => {
      if (!item.id) {
        insertSection("new", item);
      } else {
        //
      }
    });

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

  useEffect(() => {
    console.log(sections);
  }, [sections]);

  useEffect(() => {
    console.log(aboutDetail);
  }, [aboutDetail]);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <input
            onChange={(e) => {
              setAboutDetail((prev) => {
                return { ...prev, file: e.target.files[0] };
              });
            }}
            id="uploadHighlight"
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
            <label htmlFor="uploadHighlight">
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
          <Input
            value={aboutDetail.company}
            onChange={(e) => handleChangeDetail("company", e.target.value)}
            type="text"
            placeholder="Nama Perusahaan"
          />
          <Input
            value={aboutDetail.licence_number}
            onChange={(e) => handleChangeDetail("licence_number", e.target.value)}
            type="text"
            placeholder="No Lisence"
          />
        </div>
        <ReactQuill
          className="mt-4 mb-10"
          placeholder="Penjelasan Proyek"
          theme="snow"
          value={aboutDetail.description}
          onChange={(e) => handleChangeDetail("description", e)}
        />
      </form>
      <div>
        <Button type="gray" onClick={handleAddSection}>
          Add Section
        </Button>
        {sections.map((item, index) => (
          <Section
            key={index}
            data={item}
            index={index}
            number={index + 1}
            handleChange={handleChange}
            handleChangeDocumentation={handleChangeDocumentation}
            handleClickDelete={handleClickDelete}
            handleDeleteExistingDocumentation={
              handleDeleteExistingDocumentation
            }
          />
        ))}
      </div>
    </div>
  );
};

export default AboutUsDetail;
