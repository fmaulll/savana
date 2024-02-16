import { useNavigate } from "react-router-dom";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../context/LayoutContext";
import Button from "../../components/Button";
import { BiEdit } from "react-icons/bi";
import { HiOutlineTrash } from "react-icons/hi";
import { supabase } from "../../hooks/supabase";

const CareerAdmin = () => {
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [careerData, setCareerData] = useState([]);

  const handleChangeCheckbox = async (id, index) => {
    setLoading(true);
    const array = [];
    careerData.map((item) => {
      array.push({ ...item });
    });
    array[index].active = !array[index].active;

    const { error } = await supabase.from('Career').update({ active: array[index].active}).eq('id', id)

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setCareerData(array);
    setLoading(false);
  };

  const getCareerData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Career").select();
    if (data && data.length > 0) {
      setCareerData(data);
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
    getCareerData();
  }, []);

  return (
    <div className="flex flex-col">
      <Button onClick={() => navigate("/admin/karir/tambah")} type="gray">
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
                <input
                  type="checkbox"
                  // value={item.active}
                  checked={item.active}
                  onChange={(e) =>
                    handleChangeCheckbox(item.id, index)
                  }
                />
              </td>
              <td className="border py-2.5 text-center">{item.role}</td>
              <td className="border py-2.5 text-center">{item.location}</td>
              <td className="border py-2.5 text-center">{item.job_type}</td>
              <td className="border py-2.5 text-center">{item.client}</td>
              <td className="border py-2.5 text-center flex items-center"><BiEdit size={30} /> <HiOutlineTrash size={30} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CareerAdmin;
