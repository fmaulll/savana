import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { PiFilesFill } from "react-icons/pi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { HiPlus } from "react-icons/hi";
import { FaRegTrashAlt } from "react-icons/fa";
import { BiEdit } from "react-icons/bi";
import { LayoutContext } from "../../context/LayoutContext";
import Button from "../../components/Button";
import { supabase } from "../../hooks/supabase";
import ModalNewKlien from "../../components/ModalNewKlien";

const initData = {
  Proyek: 12,
  "Berita Pilihan": 10,
  Karir: 3,
};

const Dashboard = () => {
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [cardData, setCardData] = useState(initData);
  const [homePhotos, setHomePhotos] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  const handleDeleteKlien = async (id) => {
    setLoading(true);
    const { error } = await supabase.from("client").delete().eq("id", id);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setLoading(false);
    setMessage("Klien Deleted!");
    setStatus(true);
    setTimeout(() => {
      setMessage("");
      getKlien();
      return;
    }, 2000);
  };

  const getKlien = async () => {
    setLoading(true);
    const array = [];
    const { data, error } = await supabase.from("client").select();
    if (data && data.length > 0) {
      setClientData(array.concat(data));
      console.log(data);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const addKlien = async (data) => {
    const { error } = await supabase.from("client").insert(data);

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setLoading(false);
    setMessage("Client Added!");
    setStatus(true);
    setTimeout(() => {
      setMessage("");
      getKlien();
    }, 2000);
  };

  const handleSubmitAddKlien = async (dataKlien) => {
    setLoading(true);
    let dataRequest = {
      name: dataKlien.name,
      image_url: "",
      file_name: dataKlien.file.name,
    };

    const { data, error } = await supabase.storage
      .from("savana")
      .upload("client/" + dataKlien.file.name + Date.now(), dataKlien.file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      dataRequest = { ...dataRequest, image_url: getPhotosUrl(data.path) };
      addKlien(dataRequest);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
  };

  const handleClickDelete = async (file) => {
    setLoading(true);
    const { data, error } = await supabase.storage
      .from("savana")
      .remove(["home/" + file]);

    if (data) {
      getBucketData();
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const handleChange = async (event) => {
    setLoading(true);

    const file = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("savana")
      .upload("home/" + file.name + Date.now(), file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (data) {
      getBucketData();
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setLoading(false);
  };

  const getPhotosUrl = (path) => {
    const { data } = supabase.storage.from("savana").getPublicUrl(path);

    return data.publicUrl;
  };

  const getBucketData = async () => {
    setLoading(true);
    const array = [];
    const { data, error } = await supabase.storage.from("savana").list("home", {
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
        url: getPhotosUrl("home/" + item.name),
        name: item.name,
      });
    });

    setHomePhotos(array);
    setLoading(false);
  };

  const getProjectLength = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("created_at");

    if (data.length > 0) {
      return data.length;
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    return 0;
  };

  const getCareerLength = async () => {
    const { data, error } = await supabase.from("Career").select("role");

    if (data.length > 0) {
      return data.length;
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    return 0;
  };

  const getCardData = async () => {
    let dataAllCard = {
      Proyek: await getProjectLength(),
      "Berita Pilihan": 0,
      Karir: await getCareerLength(),
    };

    setCardData(dataAllCard);
  };

  useEffect(() => {
    getCardData();
    getBucketData();
    getKlien();
  }, []);

  let emptyPhotos = [];

  for (let i = 0; i < 5 - homePhotos.length; i++) {
    emptyPhotos.push("");
  }

  return (
    <div>
      <div className="flex justify-around">
        {/* loop */}
        {Object.keys(cardData).map((item, index) => (
          <div className="flex" key={index}>
            <div className="bg-[#B0C6BB] p-2.5 rounded-l-lg">
              <PiFilesFill fill="white" size={76} />
            </div>
            <p className="text-lg font-medium p-2.5 bg-[#D9E3DE] rounded-r-lg">
              {item}
              <br />
              {cardData[item]}
              <br />
              <span className="text-xs font-normal">Total {item}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="w-full mt-8">
        <span className="font-medium">
          Masukan maksimal 5 photo untuk ditampilkan pada halaman Home
        </span>
        <div className="mt-4 h-[306px] w-full border border-[#929292] flex justify-center items-center border-dashed">
          <div className="grid grid-cols-5 w-full">
            {homePhotos.map((item, index) => (
              <div
                key={index}
                className="relative border w-full h-[200px] flex justify-center "
              >
                <img
                  className="object-fill h-full cursor-pointer"
                  src={item.url}
                  alt={item.name}
                  onClick={() => window.open(item.url)}
                />
                <div
                  className="absolute top-0 right-0 p-2 bg-red-500 rounded-full cursor-pointer"
                  onClick={() => handleClickDelete(item.name)}
                >
                  <FaRegTrashAlt fill="white" />
                </div>
              </div>
            ))}
            {emptyPhotos.map((item, index) => (
              <label
                key={index}
                className="cursor-pointer"
                htmlFor="uploadPhotoHome"
              >
                <div className="border w-full h-[200px] flex justify-center items-center hover:bg-gray-300">
                  <MdOutlineAddPhotoAlternate size={48} />
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <span className="font-medium">Masukkan logo dan nama klien</span>
        <Button
          type="gray"
          className="p-1.5"
          onClick={() => setOpenModal(!openModal)}
        >
          <HiPlus size={24} />
        </Button>
      </div>

      <div>
        <table className="w-full border mt-6">
          <thead className="border bg-[#D9E3DE]">
            <tr>
              <th className="border py-2.5">No</th>
              <th className="border py-2.5">Logo</th>
              <th className="border py-2.5">Klien</th>
              <th className="border py-2.5">Action</th>
            </tr>
          </thead>

          <tbody className="border">
            {clientData.map((item, index) => (
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
                <td className="border py-2.5 text-center">
                  <div className="flex w-full h-full justify-center items-center">
                    <BiEdit
                      className="cursor-pointer mr-2"
                      onClick={() => navigate(`/admin/karir/edit/${item.id}`)}
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
      <input
        className="hidden"
        id="uploadPhotoHome"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
      {openModal && (
        <ModalNewKlien
          onSubmit={handleSubmitAddKlien}
          onClose={() => setOpenModal(!openModal)}
        />
      )}
    </div>
  );
};

export default Dashboard;
