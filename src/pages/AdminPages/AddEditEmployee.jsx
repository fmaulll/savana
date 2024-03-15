import React, { useContext, useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { useNavigate, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { supabase } from "../../hooks/supabase";
import { useEffect } from "react";
import InputDate from "../../components/InputDate";
import { FaRegTrashAlt } from "react-icons/fa";
import { getPhotosUrl } from "../../hooks/getUrl";

const initialValue = {
  service_id: "",
  name: "",
  age: "",
  birth_date: "",
  position: "",
  employment_status: "",
  licence_number: "",
  description: "",
  image_url: "",
  file_name: "",
  file: "",
};

const AddEditEmployee = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [dataRequest, setDataRequest] = useState(initialValue);

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

  const handleUploadProfile = async (file) => {
    setLoading(true);

    if (!file) {
      return {};
    }

    const { data, error } = await supabase.storage
      .from("savana")
      .upload("profile/" + file.name + Date.now(), file, {
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

  const handleDeleteExistingProfile = () => {
    setDataRequest((prev) => {
      return {
        ...prev,
        image_url: "",
      };
    });
  };

  const handleDeleteProfile = () => {
    setDataRequest((prev) => {
      return {
        ...prev,
        file: "",
      };
    });
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

    if (type === "tambah") {
      const dataHit = {
        ...dataRequest,
        ...(await handleUploadProfile(dataRequest.file)),
      };
      delete dataHit.file;

      const { error } = await supabase.from("our_team").insert(dataHit);
      if (error) {
        setLoading(false);
        setMessage(error.message);
        setStatus(false);
        return;
      }
    } else {
      let dataHit = {};

      if (dataRequest.file) {
        handleDeleteUploaded([`profile/${dataRequest.file_name}`]);
        dataHit = {
          ...dataRequest,
          ...(await handleUploadProfile(dataRequest.file)),
        };
      } else {
        dataHit = {
          ...dataRequest,
        };
      }
      delete dataHit.file;

      const { error } = await supabase
        .from("our_team")
        .update(dataHit)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        setLoading(false);
        setMessage(error.message);
        setStatus(false);
        return;
      }
    }

    setLoading(false);
    setMessage(type === "edit" ? "Employee Edited!" : "Employee Created!");
    setStatus(true);
    setTimeout(() => {
      setMessage("");
      navigate(-1);
      return;
    }, 2000);
  };


  const getDataProfile = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("our_team")
      .select()
      .eq("id", id)
      .single();

    if (data) {
      setDataRequest((prev) => {
        return {
          ...prev,
          id: data.id,
          name: data.name,
          age: data.age,
          birth_date: data.birth_date,
          position: data.position,
          employment_status: data.employment_status,
          licence_number: data.licence_number,
          description: data.description,
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
    setLoading(false);
  };

  useEffect(() => {
    if (type === "edit") {
      getDataProfile();
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-start mb-6">
          <input
            onChange={(e) => handleChange("file", e.target.files[0])}
            id="uploadProfile"
            type="file"
            className="hidden"
          />
          {dataRequest.image_url && (
            <div className="relative border w-[90px] h-[120px] flex justify-center items-center">
              <img
                className="object-fill h-full cursor-pointer"
                src={dataRequest.image_url}
                alt={dataRequest.file_name}
                onClick={() => window.open(dataRequest.image_url)}
              />
              <div
                className="absolute top-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer"
                onClick={() => handleDeleteExistingProfile(id)}
              >
                <FaRegTrashAlt fill="white" />
              </div>
            </div>
          )}
          {dataRequest.file && (
            <div className="relative border w-[90px] h-[120px] flex justify-center items-center">
              {dataRequest.file.name.slice(0, 4) + "..."}
              <div
                className="absolute top-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer"
                onClick={() => handleDeleteProfile()}
              >
                <FaRegTrashAlt fill="white" />
              </div>
            </div>
          )}
          {!dataRequest.file && !dataRequest.image_url && (
            <label htmlFor="uploadProfile">
              <div className="relative border w-[90px] h-[120px] text-center flex justify-center items-center cursor-pointer">
                Upload Photo
              </div>
            </label>
          )}
          <Button type="orange">{type === "edit" ? "Edit" : "Publish"}</Button>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input
            value={dataRequest.name}
            className="mt-4"
            type="text"
            placeholder="Nama"
            onChange={(e) => handleChange("name", e.target.value)}
          />
          <Input
            value={dataRequest.age}
            className="mt-4"
            type="text"
            placeholder="Umur"
            onChange={(e) => handleChange("age", e.target.value)}
          />
          <InputDate
            value={dataRequest.birth_date}
            className="mt-4"
            placeholder="Tanggal Lahir"
            onChange={(e) => handleChange("birth_date", e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <Input
            value={dataRequest.position}
            className="mt-4"
            type="text"
            placeholder="Jabatan"
            onChange={(e) => handleChange("position", e.target.value)}
          />
          <Input
            value={dataRequest.employment_status}
            className="mt-4"
            type="text"
            placeholder="Status"
            onChange={(e) => handleChange("employment_status", e.target.value)}
          />
          <Input
            value={dataRequest.licence_number}
            className="mt-4"
            type="text"
            placeholder="No. Licence"
            onChange={(e) => handleChange("licence_number", e.target.value)}
          />
        </div>
        <ReactQuill
          className="mt-4"
          placeholder="Rangkuman CV/Resume"
          theme="snow"
          value={dataRequest.description}
          onChange={(e) => handleChange("description", e)}
        />
      </form>
    </div>
  );
};

export default AddEditEmployee;
