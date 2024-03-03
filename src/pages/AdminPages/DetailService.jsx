import React, { Fragment, useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { SlPaperClip } from "react-icons/sl";
import { getPhotosUrl } from "../../hooks/getUrl";
import { RiExternalLinkLine } from "react-icons/ri";

const DetailService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [serviceDetail, setServiceDetail] = useState({
    description: "",
    image_url: "",
    file_name: "",
    file: "",
  });
  const [projects, setProjects] = useState([]);

  const deletePhotoFromService = async () => {
    setLoading(true);
    const { error } = await supabase
      .from("services")
      .update({ image_url: "", file_name: "" })
      .eq("id", id);
    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    getServiceDetail();
    setLoading(false);
  };

  const handleDeletePhoto = async (file) => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("savana")
      .remove(["service/" + file]);

    if (data) {
      deletePhotoFromService();
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const insertServicePhoto = async (dataRequest) => {
    setLoading(true);
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
    getServiceDetail();
    setLoading(false);
  };

  const handleUpload = async (file) => {
    setLoading(true);
    const fileName = file.name + Date.now();
    const { data, error } = await supabase.storage
      .from("savana")
      .upload(`service/${fileName}`, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      const dataRequest = {
        image_url: getPhotosUrl(data.path),
        file_name: fileName,
      };
      insertServicePhoto(dataRequest);
    }
    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const getProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("service_id", id);
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
  };

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
      {!serviceDetail || !serviceDetail.name ? (
        ""
      ) : (
        <div className="w-full font-bold text-2xl">{serviceDetail.name}</div>
      )}
      <div className="mt-4">
        <input
          onChange={(e) => handleUpload(e.target.files[0])}
          id="uploadHighlight"
          type="file"
          className="hidden"
        />
        {serviceDetail.image_url || serviceDetail.file ? (
          <div
            className={`mb-3 py-4 px-4 bg-[#D3D3D3] flex items-center rounded-lg w-min rounded-[4px] border-[#929292]`}
          >
            <FaRegTrashAlt
              className="mr-2 bg-red-500 rounded-full p-2 cursor-pointer"
              fill="white"
              size={32}
              onClick={() => handleDeletePhoto(serviceDetail.file_name)}
            />
            <span
              onClick={() => {
                if (serviceDetail.image_url) {
                  window.open(serviceDetail.image_url);
                }
              }}
              className={`text-[#7C7C7C] font-medium flex ${
                serviceDetail.image_url ? "cursor-pointer" : ""
              }`}
            >
              {serviceDetail.image_url
                ? serviceDetail.file_name.slice(0, 16) + "..."
                : serviceDetail.file.name.slice(0, 16) + "..."}{" "}
              {serviceDetail.image_url && (
                <RiExternalLinkLine size={24} className="ml-2" />
              )}
            </span>
          </div>
        ) : (
          <label htmlFor="uploadHighlight">
            <div
              className={`mb-3 py-4 px-4 bg-[#D3D3D3] cursor-pointer flex items-center rounded-lg w-full rounded-[4px] border-[#929292] w-min whitespace-nowrap`}
            >
              <SlPaperClip className="mr-2" size={24} />
              <span className="text-[#7C7C7C] font-medium">
                Highlight Photo
              </span>
            </div>
          </label>
        )}
        <Button
          type="gray"
          onClick={() => navigate(`/admin/pelayanan/description/service/${id}`)}
        >
          Edit
        </Button>
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
                      onClick={() =>
                        navigate(`/admin/pelayanan/edit/${id}/${item.id}`)
                      }
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
