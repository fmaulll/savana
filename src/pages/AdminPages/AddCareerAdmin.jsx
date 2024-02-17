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
  active: false,
  location: "",
  role: "",
  job_type: "",
  client: "",
  working_arrangement: "",
  link: "",
  description: "",
  requirement: "",
};

const AddCareerAdmin = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [dataRequest, setDataRequest] = useState(initialValue);
  const [value, setValue] = useState("");

  const publishOrEdit = async () => {
    if (type === "edit") {
      const { error } = await supabase
        .from("Career")
        .update(dataRequest)
        .eq("id", id);

      return error;
    } else {
      const { error } = await supabase.from("Career").insert(dataRequest);

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

    setLoading(true);

    const error = await publishOrEdit();

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
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
    console.log(type);
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

export default AddCareerAdmin;
