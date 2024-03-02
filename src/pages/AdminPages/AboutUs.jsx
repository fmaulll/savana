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
import { RiExternalLinkLine } from "react-icons/ri";

const initialValue = {
  name: "",
  description: "",
  image_url: "",
  file_name: "",
  file: "",
};

const AboutUs = () => {
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [aboutData, setAboutData] = useState(initialValue);
  const [projects, setProjects] = useState([]);

  const removeUpload = async () => {
    const { error } = await supabase
      .from("services")
      .update({ image_url: "", file_name: "" })
      .eq("id", aboutData.id);
    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const handleDeletePhoto = async () => {
    setLoading(true);
    setAboutData((prev) => {
      return { ...prev, image_url: "", file: "" };
    });

    const { data, error } = await supabase.storage
      .from("savana")
      .remove([`project/${aboutData.file_name}`]);

    if (data) {
      await removeUpload().then(() => {
        getServiceDetail();
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

  const insertUpload = async (dataRequest) => {
    setLoading(true);
    const { error } = await supabase
      .from("services")
      .update(dataRequest)
      .eq("id", aboutData.id);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setLoading(false);
    getServiceDetail();
  };

  const getPhotosUrl = (path) => {
    const { data } = supabase.storage.from("savana").getPublicUrl(path);

    return data.publicUrl;
  };

  const handleUpload = async (key, file) => {
    setLoading(true);
    let dataRequest = {};
    const { data, error } = await supabase.storage
      .from("savana")
      .upload("project/" + file.name + Date.now(), file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      dataRequest = {
        image_url: getPhotosUrl(data.path),
        file_name: file.name,
      };
      setAboutData((prev) => {
        return { ...prev, ...dataRequest };
      });
      await insertUpload(dataRequest);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const getTeams = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("our_team")
      .select()
      .eq("service_id", aboutData.id);
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
      .eq("name", "About Us")
      .single();
    if (data) {
      setAboutData(data);
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
    getTeams();
  }, []);
  return (
    <Fragment>
      <div>
        <Button
          type="gray"
          onClick={() =>
            navigate(`/admin/about/${aboutData.id}`)
          }
        >
          Edit
        </Button>
        {!aboutData || !aboutData.description ? (
          <div className="text-center mt-3">No description</div>
        ) : (
          <div
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: aboutData.description }}
          ></div>
        )}
      </div>
      <input
        onChange={(e) => handleUpload("file", e.target.files[0])}
        id="uploadHighlightF"
        type="file"
        className="hidden"
      />
      <div className="mt-4">
        {aboutData.image_url || aboutData.file ? (
          <div
            className={`mb-3 py-4 px-4 bg-[#D3D3D3] flex items-center rounded-lg w-min whitespace-nowrap rounded-[4px] border-[#929292]`}
          >
            <FaRegTrashAlt
              className="mr-2 bg-red-500 rounded-full p-2 cursor-pointer"
              fill="white"
              size={32}
              onClick={handleDeletePhoto}
            />
            <span
              onClick={() => {
                if (aboutData.image_url) {
                  window.open(aboutData.image_url);
                }
              }}
              className={`text-[#7C7C7C] font-medium flex ${
                aboutData.image_url ? "cursor-pointer" : ""
              }`}
            >
              {aboutData.image_url
                ? aboutData.file_name.slice(0, 16) + "..."
                : aboutData.file.name.slice(0, 16) + "..."}{" "}
              {aboutData.image_url && (
                <RiExternalLinkLine size={24} className="ml-2" />
              )}
            </span>
          </div>
        ) : (
          <label htmlFor="uploadHighlightF">
            <div
              className={`mb-3 py-4 px-4 bg-[#D3D3D3] w-min whitespace-nowrap cursor-pointer flex items-center rounded-lg w-full rounded-[4px] border-[#929292]`}
            >
              <SlPaperClip className="mr-2" size={24} />
              <span className="text-[#7C7C7C] font-medium">
                Highlight Photo
              </span>
            </div>
          </label>
        )}
      </div>
      <div className="mt-6">
        <Button
          type="gray"
          onClick={() => navigate(`/admin/about/employee/new`)}
        >
          Tambah
        </Button>

        <table className="w-full border mt-6">
          <thead className="border bg-[#D9E3DE]">
            <tr>
              <th className="border py-2.5">No</th>
              <th className="border py-2.5">Foto</th>
              <th className="border py-2.5">Nama</th>
              <th className="border py-2.5">Posisi</th>
              <th className="border py-2.5">Status</th>
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
                <td className="border py-2.5 text-center">{item.name}</td>
                <td className="border py-2.5 text-center">{item.position}</td>
                <td className="border py-2.5 text-center">
                  {item.employment_status}
                </td>
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

export default AboutUs;
