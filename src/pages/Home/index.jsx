import { Carousel } from "flowbite-react";
import React, { useContext, useState } from "react";
import { LayoutContext } from "../../context/LayoutContext";
import wording from "../../wording.json";
import SavanaLogo from "../../assets/savanaBig.png";
import { FaChevronRight } from "react-icons/fa";

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

const Home = () => {
  const { language } = useContext(LayoutContext);
  const [images, setImages] = useState([...initValue]);
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
            <img
              key={index}
              alt={item.name}
              src={item.src}
            />
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
    </div>
  );
};

export default Home;
