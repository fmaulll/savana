import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";

const Details = () => {
  const { id } = useParams();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [jobDetailsData, setJobDetailsData] = useState([]);

  const handleChangeCheckbox = async () => {};

  const getJobDetails = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("Career")
      .select()
      .eq("id", id)
      .single();
    if (data) {
      setJobDetailsData(data);
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
    getJobDetails();
  }, []);
  return (
    <div>
      <div className="h-[526px] bg-[#004723] flex items-center flex-col">
        <h1 className="text-white text-[48px] font-medium mb-2.5 mt-[252px]">
          {jobDetailsData.role}
        </h1>
        <Button>Apply Now</Button>
      </div>
      <div className="px-[110px] py-10">
        <h3 className="text-2xl font-extrabold mb-[30px]">Deskripsi Pekerjaan</h3>
        <div dangerouslySetInnerHTML={{ __html: jobDetailsData.description }}></div>

        <h3 className="text-2xl font-extrabold my-[30px]">Persyaratan</h3>
        <div dangerouslySetInnerHTML={{ __html: jobDetailsData.requirement }}></div>
      </div>
    </div>
  );
};

export default Details;
