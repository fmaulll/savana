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

  // for edit
  const [dataDocumentation, setDataDocumentation] = useState([]);
  const [deletedDocumentation, setDeletedDocumentation] = useState([]);

  const [serviceDetail, setServiceDetail] = useState({name: ""});

  const getServiceDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select("name")
      .eq("id", service_id)
      .single();
    if (data) {
      setServiceDetail({ name: data.name });
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const handleDeleteUploaded = async (filenames) => {
    const { data, error } = await supabase.storage
      .from("savana")
      .remove(filenames);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
  };

  const handleDeleteExistingDocumentation = (index, projectId) => {
    const deleted = [...deletedDocumentation];
    deleted.push(`project-${projectId}/` + dataDocumentation[index].name);
    setDeletedDocumentation(deleted);

    const array = [...dataDocumentation];
    array.splice(index, 1);
    setDataDocumentation(array);

    console.log(deleted);
  };

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
    const array = [...documentation];
    array.push(file);
    setDocumentation(array);
  };

  const getPhotosUrl = (path) => {
    const { data } = supabase.storage.from("savana").getPublicUrl(path);

    return data.publicUrl;
  };

  const handleUploadHighlight = async (file) => {
    setLoading(true);

    if (!file) {
      return {};
    }

    const { data, error } = await supabase.storage
      .from("savana")
      .upload("project/" + file.name + Date.now(), file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      return {
        image_url: data.path ? getPhotosUrl(data.path) : "",
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

  const handleDeletePhoto = () => {
    setDataRequest((prev) => {
      return {
        ...prev,
        image_url: "",
        file: "",
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (type === "tambah") {
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
    } else {
      let dataHit = {};

      if (dataRequest.file) {
        handleDeleteUploaded([`project/${dataRequest.file_name}`]);
        dataHit = {
          ...dataRequest,
          ...(await handleUploadHighlight(dataRequest.file)),
        };
      } else {
        dataHit = {
          ...dataRequest,
        };
      }

      delete dataHit.file;

      const { data, error } = await supabase
        .from("projects")
        .update(dataHit)
        .eq("id", id)
        .select()
        .single();

      if (data) {
        if (deletedDocumentation.length > 0) {
          handleDeleteUploaded(deletedDocumentation);
        }
        if (documentation.length > 0) {
          documentation.map((item) => {
            handleUploadDocumentation(item, data.id);
          });
        }
      }

      if (error) {
        setLoading(false);
        setMessage(error.message);
        setStatus(false);
        return;
      }
    }
    setLoading(false);
    setMessage(type === "edit" ? "Project Edited!" : "Project Created!");
    setStatus(true);
    setTimeout(() => {
      setMessage("");
      navigate(-1);
      return;
    }, 2000);
  };

  const getDataProject = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("id", id)
      .single();

    if (data) {
      setDataRequest((prev) => {
        return {
          ...prev,
          start_date: data.start_date,
          end_date: data.end_date,
          title: data.title,
          keyword: data.keyword,
          activity_type: data.activity_type,
          location: data.location,
          client: data.client,
          description: data.description,
          service_id: data.service_id,
          image_url: data.image_url,
          file_name: data.file_name,
        };
      });
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
  };

  const getDocumentation = async () => {
    setLoading(true);
    const array = [];
    const { data, error } = await supabase.storage
      .from("savana")
      .list(`project-${id}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "asc" },
      });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    data.map((item) => {
      array.push({
        id: item.id,
        url: getPhotosUrl(`project-${id}/` + item.name),
        name: item.name,
      });
    });

    setDataDocumentation(array);
    setLoading(false);
  };

  useEffect(() => {
    if (type === "edit") {
      getDataProject();
      getDocumentation();
    }
    getServiceDetail();
  }, []);

  return (
    <div>
      {!serviceDetail || !serviceDetail.name ? (
        ""
      ) : (
        <div className="w-full font-bold text-2xl">{serviceDetail.name}</div>
      )}
      <form className="mt-4" onSubmit={handleSubmit}>
        <div className="flex justify-between">
          <input
            onChange={(e) => handleChange("file", e.target.files[0])}
            id="uploadHighlightF"
            type="file"
            className="hidden"
          />
          {dataRequest.image_url || dataRequest.file ? (
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
                  if (dataRequest.image_url) {
                    window.open(dataRequest.image_url);
                  }
                }}
                className={`text-[#7C7C7C] font-medium flex ${
                  dataRequest.image_url ? "cursor-pointer" : ""
                }`}
              >
                {dataRequest.image_url
                  ? dataRequest.file_name.slice(0, 16) + "..."
                  : dataRequest.file.name.slice(0, 16) + "..."}{" "}
                {dataRequest.image_url && (
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
                  Highlight Photo
                </span>
              </div>
            </label>
          )}
          <Button type="orange">Submit</Button>
        </div>
        <div className="flex mt-4">
          <InputDate
            value={dataRequest.start_date}
            onChange={(e) => handleChange("start_date", e.target.value)}
            className="mr-4 w-[230px]"
            placeholder="Mulai"
          />
          <InputDate
            value={dataRequest.end_date}
            onChange={(e) => handleChange("end_date", e.target.value)}
            className="w-[230px]"
            placeholder="Selesai"
          />
        </div>
        <Input
          value={dataRequest.title}
          onChange={(e) => handleChange("title", e.target.value)}
          className="mt-4"
          type="text"
          placeholder="Judul"
        />
        <Input
          value={dataRequest.keyword}
          onChange={(e) => handleChange("keyword", e.target.value)}
          className="mt-4"
          type="text"
          placeholder="Kata Kunci"
        />
        <div className="flex gap-4 mt-4">
          <Input
            value={dataRequest.activity_type}
            onChange={(e) => handleChange("activity_type", e.target.value)}
            type="text"
            placeholder="Jenis Kegiatan"
          />
          <Input
            value={dataRequest.location}
            onChange={(e) => handleChange("location", e.target.value)}
            type="text"
            placeholder="Lokasi"
          />
        </div>
        <Input
          value={dataRequest.client}
          onChange={(e) => handleChange("client", e.target.value)}
          className="mt-4"
          type="text"
          placeholder="Klien"
        />

        <div className="w-full mt-4">
          <span className="font-medium">Masukan Foto Dokumentasi</span>
          <div className="mt-4 h-min-[306px] w-full border border-[#929292] flex justify-center items-center border-dashed">
            <div className="grid grid-cols-5 w-full">
              {dataDocumentation.map((item, index) => (
                <div
                  key={index}
                  className="relative border w-full h-[200px] flex justify-center items-center"
                >
                  <img
                    className="object-fill h-full cursor-pointer"
                    src={item.url}
                    alt={item.name}
                    onClick={() => window.open(item.url)}
                  />
                  <div
                    className="absolute top-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer"
                    onClick={() => handleDeleteExistingDocumentation(index, id)}
                  >
                    <FaRegTrashAlt fill="white" />
                  </div>
                </div>
              ))}
              {documentation.map((item, index) => (
                <div
                  key={index}
                  className="relative border w-full h-[200px] flex justify-center items-center"
                >
                  <span>{item.name.slice(0, 10) + "..."}</span>
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
