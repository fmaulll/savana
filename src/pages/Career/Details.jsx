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
      <div className="h-[146px] md:h-[526px] bg-[#004723] flex items-center flex-col">
        <h1 className="text-white md:text-[48px] font-medium mb-2.5 mt-8 md:mt-[200px]">
          {jobDetailsData.role}
        </h1>
        <Button>Apply Now</Button>
      </div>
      <div className="px-[30px] md:px-[110px] mt-6">
        <h3 className="md:text-2xl text-[14px] font-extrabold md:mb-[30px]">Deskripsi Pekerjaan</h3>
        <div className="md:text-base text-xs" dangerouslySetInnerHTML={{ __html: jobDetailsData.description }}></div>

        <h3 className="md:text-2xl text-[14px] font-extrabold mt-6 md:my-[30px]">Persyaratan</h3>
        <div className="md:text-base text-xs" dangerouslySetInnerHTML={{ __html: jobDetailsData.requirement }}></div>
      </div>
    </div>
  );
};

export default Details;
