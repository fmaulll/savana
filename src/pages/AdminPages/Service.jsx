import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";

const Service = () => {
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
      .order("created_at");
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
    <div className="grid grid-cols-4 w-full gap-x-3 gap-y-6">
      {services.map((item, index) => (
        <div
          key={index}
          onClick={() => navigate(`/admin/pelayanan/${item.id}`)}
          className="cursor-pointer py-8 text-lg font-medium flex justify-center items-center text-center min-h-[150px] rounded-lg bg-[#D9E3DE] border border-[#B0C6BB]"
        >
          {item.name}
        </div>
      ))}
    </div>
  );
};

export default Service;
