import React, { useContext, useEffect, useState } from "react";
import Background from "../../assets/Background.png";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";
import { getPhotosUrl } from "../../hooks/getUrl";
const DetailTentangKami = () => {
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [aboutUs, setAboutUs] = useState({});
  const [sections, setSections] = useState([]);

  const getAboutUs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select()
      .order("created_at")
      .eq("name", "About Us")
      .single();
    if (data) {
      setAboutUs(data);
    }
    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const getDocumentation = async (sectionId) => {
    setLoading(true);
    const array = [];
    const { data, error } = await supabase.storage
      .from("savana")
      .list(`section-${sectionId}`, {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "asc" },
      });

    if (data.length > 0) {
      console.log(data);
      data.map((item) => {
        array.push({
          id: item.id,
          url: getPhotosUrl(`section-${sectionId}/` + item.name),
          name: item.name,
        });
      });
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
    }

    setLoading(false);
    return array;
  };

  const getSections = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("sections")
      .select()
      .order("created_at");

    if (data && Array.isArray(data)) {
      // Check if data is an array
      const array = await Promise.all(
        data.map(async (item) => {
          const doc = await getDocumentation(item.id); // Await the promise
          return {
            ...item,
            dataDocumentation: doc,
            documentation: [],
            deletedDocumentation: [],
          };
        })
      );

      setSections(array); // Update state with the array
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    getSections();
    getAboutUs();
  }, []);
  return (
    <div className="">
      <div className="relative w-full bg-[#004723]">
        <div className="w-full absolute items-center flex justify-center flex-col mt-[75px] md:mt-[192px]">
          <img
            className="max-w-[90px] max-h-[90px] md:max-w-[250px] md:max-h-[250px] object-cover"
            src={aboutUs.logo_url}
            alt={aboutUs.logo_name}
          />
          <h1 className="text-white text-base md:text-[64px] font-bold">
            {aboutUs.company}
          </h1>
          <h3 className="text-white font-medium text-xs md:text-xl">
            {aboutUs.licence_number}
          </h3>
        </div>
        <img
          className="w-full h-[190px] md:h-[600px] object-cover"
          src={Background}
          alt=""
        />
      </div>
      <div
        className="px-[30px] md:px-[110px] my-6 text-xs md:text-xl"
        dangerouslySetInnerHTML={{ __html: aboutUs.description }}
      ></div>
      <div className="px-[30px] md:px-[110px]">
        {sections.map((item, index) => (
          <div key={index} className="mt-6 md:mt-14">
            <h1 className="text-xl md:text-[72px] font-bold leading-loose">{item.title}</h1>
            <div className="text-xs md:text-xl" dangerouslySetInnerHTML={{ __html: item.description }}></div>
            <div className="hidden md:grid grid-cols-3 gap-[70px] mt-8">
              {item.dataDocumentation.map((img, idx) => (
                <img onClick={() => window.open(img.url)} className="h-[270px] object-cover w-full rounded-lg border cursor-pointer" key={idx} src={img.url} alt={img.name} />
              ))}
            </div>
            <div className="flex md:hidden overflow-x-scroll mt-4">
              {item.dataDocumentation.map((img, idx) => (
                <img onClick={() => window.open(img.url)} className="h-[270px] object-cover w-full rounded-lg border cursor-pointer" key={idx} src={img.url} alt={img.name} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailTentangKami;
