import { Carousel } from "flowbite-react";
import React, { Fragment, useContext, useEffect, useState } from "react";
import { LayoutContext } from "../../context/LayoutContext";
import wording from "../../wording.json";
import SavanaLogo from "../../assets/savanaBig.png";
import { FaChevronRight } from "react-icons/fa";
import TeamPhoto from "../../assets/team.png";
import { supabase } from "../../hooks/supabase";
import KementrianLogo from "../../assets/kementrian.png";
import CareerPhoto from "../../assets/CareerPhoto.png";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowCircleLeft } from "react-icons/fa";
import HomeLoading from "../../components/HomeLoading";
import { formatFullDate } from "../../hooks/formatDate";

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

const initBerita = [
  {
    title:
      "Lorem ipsum dolor sit amet consectetur. In id ornare lectus risus est magna tellus sed.",
    keyword: "Batu Bara, Reboisasi",
    created_at: "Selasa 9 September 2023",
  },
];

const Home = () => {
  const { language, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [tabValue, setTabValue] = useState(0);
  const [images, setImages] = useState([...initValue]);
  const [pelayanan, setPelayanan] = useState([]);
  const [proyek, setProyek] = useState([]);
  const [klien, setKlien] = useState([]);
  const [tentangKami, setTentangKami] = useState({
    description: "",
    logo_url: "",
  });
  const [berita, setBerita] = useState(initBerita);
  const [loading, setLoading] = useState(initBerita);

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
      .neq("name", "About Us")
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

  const getProyek = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("projects")
      .select()
      .order("created_at");

    if (data) {
      setProyek(data);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const getKlien = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("client")
      .select()
      .order("created_at");

    if (data) {
      setKlien(data);
    }

    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const getTentangKami = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select()
      .eq("name", "About Us")
      .single();

    if (data) {
      setTentangKami(data);
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
    getTentangKami();
    getKlien();
    getProyek();
    getPelayanan();
    getBucketData();
  }, []);

  return (
    <div className="relative">
      <div className="relative h-screen flex justify-center items-center flex-col bg-[#004723] ">
        <Carousel
          className="h-[300px] md:h-[90%] rounded-none"
          slideInterval={5000}
          leftControl=" "
          rightControl=" "
        >
          {images.map((item, index) => (
            <img className="object-cover" loading="lazy" key={index} alt={item.name} src={item.url} />
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
          <img loading="lazy" src={KementrianLogo} alt="" className="mr-3" />
          <h3 className="text-[#929292]">
            Kementrian Lingkungan Hidup dan Kehutanan
          </h3>
        </div>
      </div>

      <div className="w-full px-[30px] py-2 md:py-[72px] flex justify-center md:justify-between md:items-center md:px-[110px] flex-col">
        <h1 className="font-bold text-3xl tracking-widest mb-4">
          PELAYANAN KAMI
        </h1>
        <p className="tracking-widest">
          Kami melayani berbagai sektor dalam menjalani bisnis kami.{" "}
        </p>
        <div className="grid grid-cols-3 w-full gap-9 mt-[52px]">
          {pelayanan.map((item, index) => (
            <div className="relative flex items-end justify-center" key={index}>
              <img
                loading="lazy"
                className="h-[230px] w-full object-cover rounded-lg cursor-pointer border"
                src={item.image_url}
                alt={item.name}
              />
              <h1 className="absolute mb-2 font-bold text-white">
                {item.name}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex justify-end items-end w-full mt-6">
          <Link
            className="border-b border-[#3366CC] text-[#3366CC] cursor-pointer"
            to="/services"
          >
            Lihat Detail
          </Link>
        </div>
      </div>

      <div className="px-[30px] py-2 md:py-[72px] flex justify-center md:justify-between md:items-center md:px-[110px] md:flex-row flex-col">
        <div>
          <h2 className="text-[32px] font-semibold tracking-[6.4px]">SAVANA</h2>
          <h3 className="text-2xl text-[#A5A5A5] font-semibold">
            Konsultan Lingkungan
          </h3>
          <div
            dangerouslySetInnerHTML={{ __html: tentangKami.description }}
            className="font-xl pt-4 max-w-[1000px]"
          ></div>
          <Link className="w-min">
            <div className="py-4 px-6 bg-[#E6EDE9] font-semibold rounded-lg w-min whitespace-nowrap flex items-center mt-5 cursor-pointer">
              Baca Lebih Lanjut
              <FaChevronRight className="ml-2" />
            </div>
          </Link>
        </div>
        <img
          loading="lazy"
          className="max-w-[200px] md:max-w-[290px] hidden md:block"
          src={SavanaLogo}
          alt=""
        />
      </div>

      <div className="relative w-full px-[110px] mb-[115px]">
        <img
          loading="lazy"
          className="w-full object-cover rounded-2xl"
          src={TeamPhoto}
          alt="TeamPhoto"
        />
        <h2 className="absolute bottom-[20px] absolute left-1/2 transform -translate-x-1/2 font-semibold text-2xl text-white tracking-widest">
          “Work hard, have fun, make history.”
        </h2>
      </div>

      <div className="w-full px-[30px] py-2 md:py-[72px] flex justify-center md:justify-between md:items-center md:px-[110px] flex-col">
        <h1 className="font-bold text-3xl tracking-widest">PROYEK</h1>
        <div className="w-full flex justify-between items-center">
          <div
            className={``}
            onClick={() => {
              if (tabValue == 0) {
                return;
              }
              setTabValue((prev) => prev + 1);
            }}
          >
            <FaArrowCircleLeft
              size={50}
              fill={`${tabValue != 0 ? "#004723" : "gray"}`}
              className={`${
                tabValue == 0 ? "cursor-not-allowed" : "cursor-pointer"
              }`}
            />
          </div>
          <div className="grid grid-cols-3 gap-[100px] mt-9">
            {proyek.slice(tabValue, tabValue + 2).map((item, index) => (
              <Link key={index} to={`/article/project/${item.id}`}>
                <div className="relative">
                  <img
                    loading="lazy"
                    className="object-cover h-[360px] w-[280px] rounded-lg shadow-xl"
                    src={item.image_url}
                    alt=""
                  />
                  <div className="absolute left-[16px] bottom-[16px]">
                    <span className="text-white">{item.start_date}</span>
                    <p className="text-lg text-white mt-5 font-semibold">
                      {item.title}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div
            className={``}
            onClick={() => {
              if (tabValue + 2 > proyek.length - 1) {
                return;
              }
              setTabValue((prev) => prev + 1);
            }}
          >
            <FaArrowCircleRight
              size={50}
              fill={`${tabValue + 2 > proyek.length - 1 ? "gray" : "#004723"}`}
              className={`${
                tabValue + 2 > proyek.length - 1
                  ? "cursor-not-allowed"
                  : "cursor-pointer"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-between pl-[110px] mt-[200px]">
        <div className="flex justify-center flex-col">
          <p className="text-2xl tracking-widest">
            Mulailah perjalanan karier untuk
            <br /> berkembang dan sukses dengan
            <br />
            bergabung dengan di PT. Savana
            <br /> Anugerah Lestari!
          </p>

          <Link className="w-min">
            <div className="py-4 px-6 bg-[#E6EDE9] font-semibold rounded-lg w-min whitespace-nowrap flex items-center mt-5 cursor-pointer">
              Bergabung Dengan Kami
            </div>
          </Link>
        </div>
        <img loading="lazy" src={CareerPhoto} alt="" />
      </div>

      <div className="w-full px-[30px] md:py-[72px] flex justify-center md:justify-between md:items-center md:px-[110px] flex-col mt-[128px]">
        <h1 className="font-bold text-3xl tracking-widest">KLIEN KAMI</h1>
        {klien.length > 0 ? (
          <div className="grid grid-cols-7 w-full gap-[64px] mt-12">
            {klien.map((item, index) => (
              <div className="w-[112px]" key={index}>
                <img
                  loading="lazy"
                  className="border w-[112px] max-h-[112px] object-cover"
                  src={item.image_url}
                  alt={item.name}
                />
                <p className="text-center">{item.name}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center w-full">Belum ada informasi klien</div>
        )}
      </div>

      <div className="w-full px-[30px] py-2 md:py-[72px] flex justify-center md:justify-between md:items-center md:px-[110px] flex-col">
        <h1 className="font-bold text-3xl tracking-widest mb-9">
          TRENDING TOPIK LINGKUNGAN
        </h1>
        <div className="w-full">
          {proyek.map((item, index) => (
            <Link key={index} to={`/article/project/${item.id}`}>
              <div className={`${index !== 0 && 'mt-8'} w-full px-12 py-6 rounded-xl border flex items-center`}>
                <img
                  loading="lazy"
                  className="border rounded-xl w-[260px] h-[168px] mr-6 object-cover"
                  src={item.image_url}
                  alt=""
                />
                <div className="flex justify-center items-start flex-col">
                  <span className="font-bold text-[#B7B7B7] ">
                    {formatFullDate(item.created_at)}
                  </span>
                  <h1 className="text-xl font-bold mt-6">{item.title}</h1>
                  <h3 className="font-bold mt-6">{item.keyword}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <HomeLoading isLoading={loading} />
    </div>
  );
};

export default Home;
