import { Carousel } from "flowbite-react";
import React, { useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../context/LayoutContext";
import wording from "../../wording.json";
import SavanaLogo from "../../assets/savanaBig.png";
import SavanaLogoRound from "../../assets/savanaLogoRound.png";
import { FaChevronRight } from "react-icons/fa";
import Pabrik from "../../assets/factory.png";
import { supabase } from "../../hooks/supabase";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
  // { label: "Transportation", src: "" },
];

const client = [
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
  { label: "Freeport" },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  initialSlide: 0,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Home = () => {
  const { language, setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [images, setImages] = useState([...initValue]);

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

  useEffect(() => {
    getBucketData();
  }, []);

  return (
    <div>
      <div className="relative max-h-[800px]">
        <Carousel
          className="h-[300px] md:h-[800px] rounded-none"
          slideInterval={5000}
          leftControl=" "
          rightControl=" "
        >
          {images.map((item, index) => (
            <img key={index} alt={item.name} src={item.url} />
          ))}
        </Carousel>
      </div>
      <div className="absolute bottom-[60%] left-[30px] md:left-[100px] md:bottom-[20%]">
        <h3 className="md:text-xl font-semibold text-white">
          {wording[language].landingPage.title}
        </h3>
        <h1 className="md:text-5xl font-semibold text-white">
          {wording[language].landingPage.desc}
        </h1>
      </div>
      <div className="h-[100px] bg-[#F4F7F6] flex justify-center items-center gap-4">
        <span className="italic opacity-30">Licensed By:</span>
        <img
          className="h-[67px] opacity-30"
          src={SavanaLogoRound}
          alt="Savana"
        />
        <span className="opacity-30">
          Kementrian Lingkungan Hidup dan Kehutanan
        </span>
      </div>
      <div className="px-[100px] pt-16 flex flex-col items-center">
        <h1 className="text-3xl font-semibold tracking-[4.8px]">
          OUR SERVICES
        </h1>
        <h3>We serve multiple sectors in the execution of our business</h3>
        <div className="relative">
          <div className="flex justify-between items-center gap-8 flex-wrap pt-[28px]">
            {services.map((item, index) => (
              <div
                className="w-[382px] pt-[28px] rounded-2xl shadow-2xl relative"
                key={index}
              >
                <img
                  className="w-full object-cover rounded-2xl h-[253px]"
                  src={Pabrik}
                  alt="Pabrik"
                />

                <span className="rounded-b-2xl absolute top-[90%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-xl font-semibold tracking-[2.4px]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p className="underline font-[##3366CC] pt-[28px] absolute right-0">
            Lihat Detail
          </p>
        </div>
      </div>
      <div className="px-[30px] py-2 md:py-[72px] flex justify-center md:justify-between md:items-center md:px-[100px] md:pt-[180px] md:pb-16 md:flex-row flex-col">
        <div>
          <h2 className="text-3xl font-semibold tracking-[4.8px]">SAVANA</h2>
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
      <div className="relative w-full px-[100px] pt-16">
        <img
          className="w-full object-cover rounded-2xl"
          src={Pabrik}
          alt="Pabrik"
        />
        <h2 className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 font-semibold text-2xl text-white">
          "Work hard, have fun, make history."
        </h2>
      </div>
      <div className="px-[10rem] mt-[130px] max-h-[800px]">
        <h2 className="text-3xl font-semibold tracking-[4.8px] text-center">
          PROYEK
        </h2>
        <div className="pt-8">
          <Slider {...settings}>
            {images.map((item, index) => (
              <img
                className="w-[278px] !h-[355px] px-2 object-cover"
                key={index}
                alt={item.name}
                src={item.url}
              />
            ))}
          </Slider>
        </div>
      </div>
      <div className="pt-[243px] w-full flex flex-wrap">
        <div className="w-1/2 pl-[110px] flex flex-col justify-center gap-8">
          <p className="text-2xl">
            Mulailah perjalanan karier untuk berkembang dan sukses dengan
            bergabung dengan di PT. Savana Anugerah Lestari!
          </p>
          <div className="bg-[#004723] py-4 px-6 w-fit text-[#E6EDE9] rounded-lg text-xl font-semibold">
            Bergabung Dengan Kami
          </div>
        </div>
        <div className="w-1/2 flex justify-end">
          <img
            className="w-4/5 h-[450px] rounded-l-lg rounded-r-none"
            src={Pabrik}
            alt="Pabrik"
          />
        </div>
      </div>
      <div className="pt-[128px] px-[100px] text-center">
        <h2 className="text-3xl font-semibold tracking-[4.8px]">KLIEN KAMI</h2>
        <div className="w-full flex flex-wrap justify-center">
          <div className="grid grid-cols-7 gap-20 pt-12">
            {client.map((item, index) => (
              <img
                className="w-[112px] h-[112px] object-cover"
                key={index}
                alt={item.label}
                src={Pabrik}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pt-[128px] px-[100px] text-center">
        <h2 className="text-3xl font-semibold tracking-[4.8px]">
          TRENDING TOPIK LINGKUNGAN
        </h2>
        {images.map((item, index) => (
          <div
            key={index}
            className="w-[1185px] rounded-2xl py-6 px-12 flex flex-row flex-wrap border border-[#D9D9D9] mt-8 items-center"
          >
            <img
              className="w-[260px] !h-[168px] px-2 object-cover rounded-2xl"
              key={index}
              alt={item.name}
              src={item.url}
            />
            <div className="flex flex-col items-start gap-2 pl-5 w-[800px] text-left">
              <p className="text-[#B7B7B7] font-semibold">
                Selasa 9 September 2023
              </p>
              <p className="text-[#004723] font-semibold text-2xl">
                Lorem ipsum dolor sit amet consectetur. In id ornare lectus
                risus est magna tellus sed.
              </p>
              <p className="text-[#252525] font-semibold">
                Batu Bara, Reboisasi
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mb-[116px]"></div>
    </div>
  );
};

export default Home;
