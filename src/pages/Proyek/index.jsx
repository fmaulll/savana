import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";
import { formatDateMonthYear } from "../../hooks/formatDate";
import { supabase } from "../../hooks/supabase";

const Proyek = () => {
  const { language, setMessage, setStatus, setLoading } =
    useContext(LayoutContext);
  const [project, setProject] = useState([]);
  const [offset, setOffset] = useState(0);

  const getProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select()
      .range(offset * 2, offset * 2 + 2);

    if (data) {
      setProject(data);
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
    getProjects();
  }, [offset]);
  return (
    <div className="w-full px-[30px] mt-10 flex md:items-center md:px-[110px] flex-col">
      <h1 className="text-center text-3xl font-bold border-b-[3px] border-[#004723] py-[10px]">
        Proyek
      </h1>
      <div className="w-full mt-14">
        {project.map((item, index) => (
          <div
            key={index}
            className={`${index !== 0 && "mt-12"} relative w-full`}
          >
            <img
              className="w-full h-[506px] object-cover rounded-lg"
              src={item.image_url}
              alt=""
            />
            <div className="w-full absolute left-0 bottom-0 px-4 py-6">
              <span className="font-bold text-xl text-white">
                {formatDateMonthYear(item.created_at)}
              </span>
              <h1 className="text-2xl text-white font-bold mt-5">
                {item.title}
              </h1>
              <div className="flex justify-end w-full mt-5">
                <Link className="text-white border-b-2">Lihat Detail</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center mt-10">
        {offset !== 0 && (
          <div
            onClick={() => setOffset((prev) => prev - 1)}
            className={`border-2 rounded border-black w-[36px] h-[36px] flex justify-center items-center cursor-pointer font-bold mr-3.5`}
          >
            {offset}
          </div>
        )}
        <div
          className={`rounded bg-[#004723] text-white w-[44px] h-[44px] flex justify-center items-center cursor-pointer font-bold mr-3.5`}
        >
          {offset + 1}
        </div>
        <div
          onClick={() => {
            if (project.length > 2) {
              setOffset((prev) => prev + 1);
            }
          }}
          className={`${
            project.length > 2
              ? "cursor-pointer bg-white border-black"
              : "cursor-not-allowed bg-gray-400 border-gray-400"
          } border-2 rounded w-[36px] h-[36px] flex justify-center items-center font-bold`}
        >
          {offset + 2}
        </div>
      </div>
    </div>
  );
};

export default Proyek;
