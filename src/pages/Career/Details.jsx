import { createClient } from "@supabase/supabase-js";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

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
  return <div>
    <span>{jobDetailsData.role}</span>
    <div dangerouslySetInnerHTML={{__html: jobDetailsData.requirement}}></div>
  </div>;
};

export default Details;
