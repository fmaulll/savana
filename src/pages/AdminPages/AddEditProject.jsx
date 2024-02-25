import React, { useContext, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../../hooks/supabase";
import { useEffect } from "react";

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

  const uploadTableImages = async (array) => {
    const { error } = await supabase.from("countries").insert([array]);

    return error;
  };

  const uploadImages = async (file) => {
    let file_data = { path: "", url: "", file_name: file.name };
    const { data, error } = await supabase.storage
      .from("savana")
      .upload("project/" + file.name, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      file_data = {
        ...file_data,
        path: data.path,
        file_name: getPhotosUrl(data.path),
      };
      return file_data;
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return "";
    }

    setLoading(false);
    return "";
  };

  const getPhotosUrl = (path) => {
    const { data } = supabase.storage.from("savana").getPublicUrl(path);

    return data.publicUrl;
  };

  const publishOrEdit = async (dataValue) => {
    if (type === "edit") {
      const { error } = await supabase
        .from("projects")
        .update(dataValue)
        .eq("id", id);

      return error;
    } else {
      const { error } = await supabase.from("project").insert(dataValue);

      return error;
    }
  };

  const getCareerData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Career")
      .select()
      .eq("id", id)
      .single();
    if (data) {
      setDataRequest(data);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const handleChange = (key, value) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (
      !dataRequest.location ||
      !dataRequest.role ||
      !dataRequest.job_type ||
      !dataRequest.client ||
      !dataRequest.working_arrangement ||
      !dataRequest.description ||
      !dataRequest.requirement
    ) {
      setLoading(false);
      setMessage("Make sure to fill all of the inputs!");
      setStatus(false);
      return;
    }

    let dataValue = dataRequest;
    let uploadValue = "";

    if (dataValue.file) {
      uploadValue = await uploadImages(dataValue.file);
      dataValue = {
        ...dataValue,
        file_name: uploadValue.file_name,
        image_url: uploadValue.url,
      };
    }

    dataValue = {
      ...dataValue,
      service_id: service_id,
    };

    delete dataValue.file;

    const error = await publishOrEdit(dataValue);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    const documentationImages = documentation.map((item, index) => {
      return {
        image_url: uploadImages(item.file),
        file_name: item.file.name,
        project_id: id,
      };
    });

    if (documentationImages.length > 0) {
      const errorInsertImages = await uploadTableImages(documentationImages);

      if (errorInsertImages) {
        setLoading(false);
        setMessage(errorInsertImages.message);
        setStatus(false);
        return;
      }
    }

    setLoading(false);
    setMessage(type === "edit" ? "Job Edited!" : "Job Created!");
    setStatus(true);
    setTimeout(() => {
      setMessage("");
      navigate("/admin/karir");
      return;
    }, 2000);
  };

  useEffect(() => {
    if (type === "edit") {
      getCareerData();
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <input
              checked={dataRequest.active}
              id="activeJob"
              type="checkbox"
              onChange={(e) =>
                setDataRequest((prev) => {
                  return { ...prev, active: e.target.checked };
                })
              }
            />
            <label className="ml-2" htmlFor="activeJob">
              Active
            </label>
          </div>
          <Button type="orange">{type === "edit" ? "Edit" : "Publish"}</Button>
        </div>
        <Input
          value={dataRequest.role}
          type="text"
          placeholder="Posisi Pekerjaan"
          onChange={(e) => handleChange("role", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            value={dataRequest.job_type}
            type="text"
            placeholder="Tipe Pekerjaan"
            onChange={(e) => handleChange("job_type", e.target.value)}
          />
          <Input
            value={dataRequest.working_arrangement}
            type="text"
            placeholder="Sistem Kerja"
            onChange={(e) =>
              handleChange("working_arrangement", e.target.value)
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            value={dataRequest.location}
            type="text"
            placeholder="Lokasi"
            onChange={(e) => handleChange("location", e.target.value)}
          />
          <Input
            value={dataRequest.client}
            type="text"
            placeholder="Klien"
            onChange={(e) => handleChange("client", e.target.value)}
          />
        </div>
        <Input
          value={dataRequest.link}
          className="mt-4"
          type="text"
          placeholder="Link"
          onChange={(e) => handleChange("link", e.target.value)}
        />
        <ReactQuill
          className="mt-4"
          placeholder="Deskripsi Pekerjaan"
          theme="snow"
          value={dataRequest.description}
          onChange={(e) => handleChange("description", e)}
        />
        <ReactQuill
          className="mt-4 mb-10"
          placeholder="Persyaratan Pekerjaan"
          theme="snow"
          value={dataRequest.requirement}
          onChange={(e) => handleChange("requirement", e)}
        />
      </form>
    </div>
  );
};

export default AddEditProject;
