import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import SavanaLogo from "../../assets/savanaBig.png";

const HomeLoading = ({ isLoading }) => {
  const [opacity, setOpacity] = useState(100);
  const [hidden, setHidden] = useState('');

  useEffect(() => {
    if (!isLoading) {
      setTimeout(() => {
        setOpacity(0);
        setTimeout(() => {
            setHidden('hidden')
        }, 1000)
      }, 2000);
    }
  }, [isLoading]);
  return (
    <div
      className={`h-screen w-full fixed top-0 left-0 bg-[#004723] z-10 fade-out transition-opacity duration-1000 opacity-${opacity} flex justify-center items-center ${hidden}`}
    >
      <img src={SavanaLogo} alt="Savana Logo" />
    </div>
  );
};
//${isLoading ? 'fade-out transition-opacity duration-1000 opacity-100' : 'opacity-0'}
export default HomeLoading;
