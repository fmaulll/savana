import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { Link, useParams } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";
import { getPhotosUrl } from "../../hooks/getUrl";
import { supabase } from "../../hooks/supabase";

const initValue = {
  id: "-2072-4426-9c21-ba2ec48c6be1",
  created_at: "",
  start_date: "",
  end_date: "",
  title: "",
  keyword: "",
  activity_type: "",
  location: "",
  client: "",
  description: "",
  service_id: "",
  image_url: "",
  file_name: "",
};

function getMonthDifference(date1, date2) {
  const format1 = new Date(date1);
  const format2 = new Date(date2);
  const months1 = format1.getFullYear() * 12 + format1.getMonth();
  const months2 = format2.getFullYear() * 12 + format2.getMonth();
  return Math.abs(months2 - months1);
}

const DetailProyek = () => {
  const { language, setMessage, setStatus, setLoading } =
    useContext(LayoutContext);
  const { id } = useParams();
  const [project, setProject] = useState(initValue);
  const [documentation, setDocumentation] = useState([]);

  const getProject = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select()
      .eq("id", id)
      .single();

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

  const getDocumentation = async () => {
    setLoading(true);
    const array = [];
    const { data, error } = await supabase.storage
      .from("savana")
      .list(`project-${id}`, {
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
        url: getPhotosUrl(`project-${id}/` + item.name),
        name: item.name,
      });
    });

    setDocumentation(array);
    setLoading(false);
  };

  useEffect(() => {
    getDocumentation();
    getProject();
  }, []);
  return (
    <div className="w-full px-[30px] mt-10 flex md:px-[110px] flex-col">
      <div className="flex items-center">
        <Link className="font-bold text-xl mr-2" to="/">
          Home
        </Link>{" "}
        <FaChevronRight />{" "}
        <Link className="ml-2 font-bold text-xl" to="/article">
          Proyek
        </Link>
      </div>
      <h1 className="whitespace-nowrap text-center text-3xl font-bold py-[10px]">
        {project.title}
      </h1>
      <span className="text-center text-xl font-bold mt-8">
        {project.client} - {project.activity_type}
      </span>
      <img className="rounded-2xl mt-14 h-[732px] object-cover" src={project.image_url} alt="" />
      <div
        className="mt-14"
        dangerouslySetInnerHTML={{ __html: project.description }}
      ></div>
      <div className="mt-[18px]">
        <h5 className="font-bold">Lama waktu pengerjaan :</h5>
        <span>
          {getMonthDifference(project.start_date, project.end_date)} Bulan
        </span>
      </div>
      <div className="grid grid-cols-3 gap-x-[70px] gap-y-8 mt-6">
        {documentation.map((item, index) => (
          <img onClick={() => window.open(item.url)} className="cursor-pointer h-[450px] object-cover w-full rounded-lg border" key={index} src={item.url} alt={item.name} />
        ))}
      </div>
    </div>
  );
};

export default DetailProyek;
