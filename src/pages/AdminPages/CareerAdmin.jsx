import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../context/LayoutContext";
import Button from "../../components/Button";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const CareerAdmin = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(LayoutContext);
  const [careerData, setCareerData] = useState([]);

  const handleChangeCheckbox = async() => {

  }

  const getCareerData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Career").select();
    if (data && data.length > 0) {
      setCareerData(data);
    }

    if (error) {
      alert(error);
    }
    setLoading(false);
  };
  useEffect(() => {
    getCareerData();
  }, []);

  return (
    <div className="flex flex-col">
      <Button
        onClick={() => navigate("/admin/karir/tambah")}
        className="w-min"
        type="gray"
      >
        Tambah
      </Button>
      <table className="w-full border mt-6">
        <thead className="border bg-[#D9E3DE]">
          <tr>
            <th className="border py-2.5">No</th>
            <th className="border py-2.5">Active</th>
            <th className="border py-2.5">Posisi Pekerjaan</th>
            <th className="border py-2.5">Lokasi</th>
            <th className="border py-2.5">Tipe Pekerjaan</th>
            <th className="border py-2.5">Klien</th>
            <th className="border py-2.5">Action</th>
          </tr>
        </thead>

        <tbody className="border">
          {careerData.map((item, index) => (
            <tr key={index}>
              <td className="border py-2.5 text-center">{index + 1}</td>
              <td className="border py-2.5 text-center">
                <input type="checkbox" checked={item.active} onChange={() => {}} />
              </td>
              <td className="border py-2.5 text-center">{item.role}</td>
              <td className="border py-2.5 text-center">{item.location}</td>
              <td className="border py-2.5 text-center">{item.job_type}</td>
              <td className="border py-2.5 text-center">{item.client}</td>
              <td className="border py-2.5 text-center">Edit Delete</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CareerAdmin;
