import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";
import { formatDate } from "../../hooks/formatDate";
import { supabase } from "../../hooks/supabase";
import { FaLocationDot } from "react-icons/fa6";
import { FaBuilding } from "react-icons/fa6";
import { FaBriefcase } from "react-icons/fa";
import { FaChevronRight } from "react-icons/fa";

const initValue = {
  id: "",
  created_at: "",
  name: "",
  description: "",
  image_url: "",
  file_name: "",
  company: "",
  licence_number: "",
  logo_url: "",
  logo_name: "",
};

const DetailPelayanan = () => {
  const { language, setMessage, setStatus, setLoading } =
    useContext(LayoutContext);
  const { id } = useParams();
  const [detailService, setDetailService] = useState(initValue);
  const [project, setProject] = useState([]);

  const getDetailServices = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select()
      .eq("id", id)
      .single();

    if (data) {
      setDetailService((prev) => {
        return { ...prev, ...data };
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

  const getProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("service_id", id);

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
    getDetailServices();
    getProjects();
  }, []);
  return (
    <div className="w-full flex md:items-center flex-col">
      <div className="relative w-full flex justify-center">
        <img
          className="object-cover w-full h-[140px] md:h-[500px] rounded-b-[50%]"
          src={detailService.image_url}
          alt={detailService.name}
        />
        <h1 className="absolute bottom-[20px] md:bottom-[70px] text-white font-bold text-xl md:text-[64px]">
          {detailService.name}
        </h1>
      </div>
      <div className="px-[30px] md:px-[110px] w-full mt-4 md:mt-14">
        <div className="flex items-center">
          <Link className="font-bold text-[10px] md:text-xl mr-2" to="/">
            Home
          </Link>{" "}
          <FaChevronRight />{" "}
          <Link className="ml-2 font-bold text-[10px] md:text-xl" to="/services">
            Pelayanan
          </Link>
        </div>
        <div className="mt-3 flex justify-center flex-col items-center">
          <h1 className="text-center text-xl md:text-3xl font-bold border-b-[3px] border-[#004723] py-[10px] w-min whitespace-nowrap">
            Proyek Kami
          </h1>
          <div
            className="w-full mt-6"
            dangerouslySetInnerHTML={{ __html: detailService.description }}
          ></div>
        </div>

        <div className="w-full mt-6">
          {project.map((item, index) => (
            <Link to={`/article/project/${item.id}`}>
              <div
                key={index}
                className="w-full px-3 py-2 md:px-12 md:py-6 rounded-xl border flex items-center"
              >
                <img
                  loading="lazy"
                  className="border rounded-xl w-[111px] md:w-[260px] h-[100px] md:h-[168px] mr-4 md:mr-6"
                  src={item.image_url}
                  alt={item.title}
                />
                <div className="flex justify-center items-start flex-col w-full">
                  <span className="font-bold text-[#B7B7B7] text-[10px] md:text-base">
                    {formatDate(item.start_date)} - {formatDate(item.end_date)}
                  </span>
                  <h1 className="md:text-xl text-[11px] font-medium mt-2">{item.title}</h1>
                  <div className="grid grid-cols-1 md:grid-cols-2 w-full mt-2 md:mt-4">
                    <div className="flex items-center">
                      <FaLocationDot fill="#929292" className="mr-2" />{" "}
                      <span className="text-[10px] md:text-[18px] text-[#929292] font-medium">
                        {item.location}
                      </span>
                    </div>
                    <div className="flex items-center mt-1">
                      <FaBuilding fill="#929292" className="mr-2" />{" "}
                      <span className="text-[10px] md:text-[18px] text-[#929292] font-medium">
                        {item.client}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center mt-1 md:mt-4">
                    <FaBriefcase fill="#929292" className="mr-2" />
                    <span className="text-[10px] md:text-[18px] font-bold text-[#B7B7B7] ">
                      {item.activity_type}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailPelayanan;
