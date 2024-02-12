import React, { useContext, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { useNavigate } from "react-router-dom";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const initialValue = {
  active: false,
  location: "",
  role: "",
  job_type: "",
  client: "",
  working_arrangement: "",
  link: "",
  description: "",
};

const AddCareerAdmin = () => {
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [dataRequest, setDataRequest] = useState(initialValue);

  const handleChange = (key, value) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
    // console.log(dataRequest);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dataRequest);
    if (
      !dataRequest.location ||
      !dataRequest.role ||
      !dataRequest.job_type ||
      !dataRequest.client ||
      !dataRequest.working_arrangement ||
      !dataRequest.description
    ) {
      setLoading(false);
      setMessage("Make sure to fill all of the inputs!");
      setStatus(false);
      return;
    }

    setLoading(true);

    const { error } = await supabase.from("Career").insert(dataRequest);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setLoading(false);
    setMessage("Job Created!");
    setStatus(true);
    setTimeout(() => {
      setMessage("");
      navigate("/admin/karir");
      return;
    }, 2000);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between mb-6">
          <div className="flex items-center">
            <input
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
          <Button type="orange" className="w-min">
            Publish
          </Button>
        </div>
        <Input
          type="text"
          placeholder="Posisi Pekerjaan"
          onChange={(e) => handleChange("role", e.target.value)}
        />
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            type="text"
            placeholder="Tipe Pekerjaan"
            onChange={(e) => handleChange("job_type", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Sistem Kerja"
            onChange={(e) =>
              handleChange("working_arrangement", e.target.value)
            }
          />
        </div>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <Input
            type="text"
            placeholder="Lokasi"
            onChange={(e) => handleChange("location", e.target.value)}
          />
          <Input
            type="text"
            placeholder="Klien"
            onChange={(e) => handleChange("client", e.target.value)}
          />
        </div>
        <Input
          className="mt-4"
          type="text"
          placeholder="Link"
          onChange={(e) => handleChange("link", e.target.value)}
        />
        <textarea
          placeholder="Deskripsi Pekerjaan"
          className="py-2 px-3 bg-white flex justify-between items-center rounded-lg w-full border rounded-[4px] border-[#929292] mt-4 bg-white text-sm h-[200px]"
          onChange={(e) => handleChange("description", e.target.value)}
        ></textarea>
      </form>
    </div>
  );
};

export default AddCareerAdmin;