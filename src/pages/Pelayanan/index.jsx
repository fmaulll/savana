import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";

const Pelayanan = () => {
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [services, setServices] = useState([]);

  const getServices = async () => {
    setLoading(true);
    const array = [];
    const { data, error } = await supabase
      .from("services")
      .select()
      .order("created_at")
      .neq("name", "About Us");
    if (data && data.length > 0) {
      setServices(array.concat(data));
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
    getServices();
  }, []);
  return (
    <div className="w-full px-[30px] mt-10 flex md:items-center md:px-[110px] flex-col">
      <h1 className="text-center text-3xl font-bold border-b-[3px] border-[#004723] py-[10px]">
        Pelayanan Kami
      </h1>
      <p className="text-center mt-6 text-lg text-[#004723]">
        PT SAL didukung oleh tenaga ahli yang berpengalaman dalam menangani
        proyek-proyek lingkungan dan kehutanan
        <br /> berskala nasional dan internasional.
      </p>
      <div className="grid grid-cols-2 w-full gap-x-[78px] gap-y-[32px] mt-14">
        {services.map((item, index) => (
          <Link to={`/services/detail/${item.id}`}>
            <div className="w-full relative flex justify-center" key={index}>
              <img
                className="w-full h-[432px] rounded-xl border object-cover"
                src={item.image_url}
                alt={item.name}
              />
              <h1 className="absolute bottom-[24px] text-3xl font-bold text-white">
                {item.name}
              </h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Pelayanan;
