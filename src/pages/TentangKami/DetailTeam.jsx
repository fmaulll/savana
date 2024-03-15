import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";

const DetailTeam = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [person, setPerson] = useState({});

  const getPerson = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("our_team")
      .select()
      .eq("id", id)
      .single();
    if (data) {
      setPerson(data);
    }
    console.log(person);
    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    getPerson();
  }, []);
  return (
    <div>
      <div className="w-full h-[190px] md:h-[600px] bg-[#004723] rounded-b-xl flex justify-between items-end px-[30px] md:px-[110px]">
        <div className="h-full">
          <h1 className="text-white md:text-[48px] font-bold md:mt-[186px] mt-[70px]">{person.name}</h1>
          <h3 className="text-white font-bold text-xs md:text-xl">{person.position}</h3>
        </div>
        <img
          className="w-[75px] h-[105px] md:w-[350px] md:h-[450px] object-cover"
          src={person.image_url}
          alt=""
        />
      </div>
      <div className="px-[30px] md:px-[110px] my-6 text-xs md:text-base" dangerouslySetInnerHTML={{__html:person.description}}></div>
    </div>
  );
};

export default DetailTeam;
