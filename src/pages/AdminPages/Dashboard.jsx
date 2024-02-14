import { createClient } from "@supabase/supabase-js";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { PiArrowCounterClockwiseLight, PiFilesFill } from "react-icons/pi";
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

  const getPhotosUrls = async (files) => {
    const array = [];
    files.map((item) => {
      const { data } = supabase.storage.from("savana").getPublicUrl(item);

      array.push(data);
    });

    setHomePhotos(array);
    console.log(homePhotos);
    setLoading(false);
  };

  const getBucketData = async () => {
    setLoading(true);
    const array = [];
    const { data, error } = await supabase.storage.from("savana").list("home", {
      limit: 100,
      offset: 0,
      sortBy: { column: "name", order: "asc" },
    });

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }

    data.map((item) => {
      array.push("home/" + item.name);
    });

    getPhotosUrls(array);
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

      {homePhotos.map((item, index) => (
        <img src={item.publicUrl} alt="" />
      ))}

      <label className="cursor-pointer" htmlFor="uploadPhotoHome">
        <div className="h-[306px] w-full border border-[#929292] rounded flex justify-center items-center text-[#929292] border-dashed">
          Dokumentasi Proyek
        </div>
      </label>
      <input className="hidden" id="uploadPhotoHome" type="file" />
    </div>
  );
};

export default Dashboard;
