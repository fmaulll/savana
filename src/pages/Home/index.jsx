import { Carousel } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../context/LayoutContext";
import wording from "../../wording.json";
import SavanaLogo from "../../assets/savanaBig.png";
import { FaChevronRight } from "react-icons/fa";
import Pabrik from "../../assets/factory.png";
import { supabase } from "../../hooks/supabase";
import KementrianLogo from "../../assets/kementrian.png";

const initValue = [
  {
    name: "...",
    src: "https://flowbite.com/docs/images/carousel/carousel-1.svg",
  },
  {
    name: "...",
    src: "https://flowbite.com/docs/images/carousel/carousel-2.svg",
  },
  {
    name: "...",
    src: "https://flowbite.com/docs/images/carousel/carousel-3.svg",
  },
  {
    name: "...",
    src: "https://flowbite.com/docs/images/carousel/carousel-4.svg",
  },
  {
    name: "...",
    src: "https://flowbite.com/docs/images/carousel/carousel-5.svg",
  },
];

const services = [
  { label: "Industry", src: "" },
  { label: "Plantation", src: "" },
  { label: "Mining", src: "" },
  { label: "Transportation", src: "" },
];

const Home = () => {
  const { language, setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [images, setImages] = useState([...initValue]);
  const [pelayanan, setPelayanan] = useState([]);

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

    setImages(array);
    setLoading(false);
  };

  const getPelayanan = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select()
      .limit(3)
      .order("created_at");

    if (data) {
      setPelayanan(data);
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
    getPelayanan();
    getBucketData();
  }, []);

  return (
    <div>
      <div className="relative h-screen flex justify-center items-center flex-col">
        <Carousel
          className="h-[300px] md:h-[90%] rounded-none"
          slideInterval={5000}
          leftControl=" "
          rightControl=" "
        >
          {images.map((item, index) => (
            <img key={index} alt={item.name} src={item.url} />
          ))}
        </Carousel>
        <div className="absolute">
          <h1 className="md:text-5xl font-semibold text-white text-center">
            Completed Permits, Smooth Business
          </h1>
          <p className="md:text-xl font-semibold text-white text-center mt-6">
            Your permits are completed, your business is
            <br /> running as planned
          </p>
          <div className="flex justify-center items-center mt-10">
            <div
              className={`rounded-[24px] py-3 px-6 text-lg font-bold cursor-pointer bg-white text-[#00391C] whitespace-nowrap w-min mr-[30px] cursor-pointer`}
            >
              Contact Us
            </div>
            <div
              className={`rounded-[24px] py-3 px-6 text-lg font-bold cursor-pointer bg-transparent text-white border-2 border-white whitespace-nowrap w-min cursor-pointer`}
            >
              Learn More
            </div>
          </div>
        </div>
        <div className="h-[10%] bg-[#D9E3DE] w-full flex justify-center items-center">
          <i className="mr-3 text-[#929292]">Licenced By: </i>
          <img src={KementrianLogo} alt="" className="mr-3" />
          <h3 className="text-[#929292]">
            Kementrian Lingkungan Hidup dan Kehutanan
          </h3>
        </div>
      </div>

      <div className="px-[30px] py-2 md:py-[72px] flex justify-center md:justify-between md:items-center md:px-[100px] md:flex-row flex-col">
        <h1>Pelayanan Kami</h1>
        <p>Kami melayani berbagai sektor dalam menjalani bisnis kami. </p>
        <div className="grid grid-cols-3">
          {pelayanan.map((item, index) => (
            <div key={index}>
              <img src={item.image_url} alt={item.name} />
            </div>
          ))}
        </div>
      </div>

      <div className="px-[30px] py-2 md:py-[72px] flex justify-center md:justify-between md:items-center md:px-[100px] md:flex-row flex-col">
        <div>
          <h2 className="text-[32px] font-semibold tracking-[6.4px]">SAVANA</h2>
          <h3 className="text-2xl text-[#A5A5A5] font-semibold">
            {wording[language].smallDescription.subTitle}
          </h3>
          <p className="font-xl pt-4 max-w-[1000px]">
            {wording[language].smallDescription.desc}
          </p>
          <div className="py-4 px-6 bg-[#E6EDE9] font-semibold rounded-lg w-min whitespace-nowrap flex items-center mt-5 cursor-pointer">
            {wording[language].smallDescription.button}{" "}
            <FaChevronRight className="ml-2" />
          </div>
        </div>
        <img
          className="max-w-[200px] md:max-w-[290px] hidden md:block"
          src={SavanaLogo}
          alt=""
        />
      </div>
      <div className="relative w-full px-[100px] mb-[116px]">
        <img
          className="w-full object-cover rounded-2xl"
          src={Pabrik}
          alt="Pabrik"
        />
        <h2 className="absolute bottom-[20px] absolute left-1/2 transform -translate-x-1/2 font-semibold text-2xl text-white">
          Project Documentation
        </h2>
      </div>
      <div className="px-[100px]">
        <h1>Our Services</h1>
        <h3>We serve multiple sectors in the execution of our business</h3>
        <div className="flex justify-between items-center">
          {services.map((item, index) => (
            <div className="w-[224px] rounded-2xl shadow-2xl" key={index}>
              <img
                className="w-full object-cover rounded-t-2xl h-[253px]"
                src={Pabrik}
                alt="Pabrik"
              />
              <div className="py-4 flex justify-center items-center bg-white rounded-b-2xl">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
