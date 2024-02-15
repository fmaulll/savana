import { createClient } from "@supabase/supabase-js";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { PiFilesFill } from "react-icons/pi";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BiEdit } from "react-icons/bi";
import { FaRegTrashAlt } from "react-icons/fa";
import { LayoutContext } from "../../context/LayoutContext";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

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
      .upload("home/" + file.name, file, {
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

  const getCardData = async () => {
    let dataAllCard = {
      Proyek: 0,
      "Berita Pilihan": 0,
      Karir: 0,
    };
    const { data, error } = await supabase.from("Career").select("role");

    if (data.length > 0) {
      dataAllCard["Karir"] = data.length;
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    setCardData(dataAllCard);
  };

  useEffect(() => {
    getCardData();
    getBucketData();
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

      <div className="h-[306px] w-full border border-[#929292] flex justify-center items-center border-dashed">
        <div className="grid grid-cols-5 w-full">
          {homePhotos.map((item, index) => (
            <div key={index} className="relative border w-full h-[200px] flex justify-center ">
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
      <input
        className="hidden"
        id="uploadPhotoHome"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </div>
  );
};

export default Dashboard;
