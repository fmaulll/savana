import React, { Fragment, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";

const DetailService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [serviceDetail, setServiceDetail] = useState(null);
  const [projects, setProjects] = useState([]);

  const getProjects = async() => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("service_id", id)
    if (data) {
      setProjects(data);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  }

  const getServiceDetail = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select()
      .eq("id", id)
      .single();
    if (data) {
      setServiceDetail(data);
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
    getServiceDetail();
    getProjects();  
  }, []);
  return (
    <Fragment>
      {!serviceDetail || !serviceDetail.name  ? "" : <div className="w-full font-bold text-2xl">{serviceDetail.name}</div>}
      <div className="mt-4">
        <Button type="gray" onClick={() => navigate(`/admin/pelayanan/description/service/${id}`)}>Edit</Button>
        {!serviceDetail || !serviceDetail.description ? (
          <div className="text-center mt-3">No description</div>
        ) : (
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: serviceDetail.description }}
          ></div>
        )}
      </div>
      <div className="mt-6">
        <Button
          type="gray"
          onClick={() => navigate(`/admin/pelayanan/tambah/${id}/new`)}
        >
          Tambah
        </Button>

        <table className="w-full border mt-6">
          <thead className="border bg-[#D9E3DE]">
            <tr>
              <th className="border py-2.5">No</th>
              <th className="border py-2.5">Gambar</th>
              <th className="border py-2.5">Judul</th>
              <th className="border py-2.5">Lokasi</th>
              <th className="border py-2.5">Jenis Kegiatan</th>
              <th className="border py-2.5">Klien</th>
              <th className="border py-2.5">Action</th>
            </tr>
          </thead>

          <tbody className="border">
            {projects.map((item, index) => (
              <tr key={index}>
                <td className="border py-2.5 text-center">{index + 1}</td>
                <td className="border py-2.5 text-center flex justify-center">
                  <img
                    onClick={() => window.open(item.image_url)}
                    className="h-[100px] cursor-pointer"
                    src={item.image_url}
                    alt={item.name}
                  />
                </td>
                <td className="border py-2.5 text-center">{item.title}</td>
                <td className="border py-2.5 text-center">{item.location}</td>
                <td className="border py-2.5 text-center">
                  {item.activity_type}
                </td>
                <td className="border py-2.5 text-center">{item.client}</td>
                <td className="border py-2.5 text-center">
                  <div className="flex w-full h-full justify-center items-center">
                    <BiEdit
                      className="cursor-pointer mr-2"
                      onClick={() => navigate(`/admin/pelayanan/edit/${id}/${item.id}`)}
                      size={30}
                    />
                    <FaRegTrashAlt
                      fill="red"
                      size={24}
                      className="cursor-pointer"
                      onClick={() => handleDeleteKlien(item.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default DetailService;
