import React, { useContext, useEffect, useState } from "react";
import Background from "../../assets/Background.png";
import { LayoutContext } from "../../context/LayoutContext";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../../hooks/supabase";

const TentangKami = () => {
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [aboutUs, setAboutUs] = useState({});
  const [ourTeam, setOurTeam] = useState({});

  const getAboutUs = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("services")
      .select()
      .order("created_at")
      .eq("name", "About Us")
      .single();
    if (data) {
      setAboutUs(data);
    }
    console.log(aboutUs);
    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  const getTeam = async () => {
    setLoading(true);
    const obj = {};
    const { data, error } = await supabase
      .from("our_team")
      .select()
      .order("created_at");
    //   .neq("name", "About Us");
    if (data && data.length > 0) {
      data.map((item, index) => {
        obj[item.position] =
          obj[item.position] && obj[item.position].length > 0
            ? [...obj[item.position], item]
            : [item];
      });
    }
    setOurTeam(obj);
    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    getAboutUs();
    getTeam();
  }, []);
  return (
    <div>
      <div className="relative">
        <img
          loading="lazy"
          className="w-full h-[calc(100vh-75px)] md:h-[calc(100vh-122px)] object-cover"
          src={Background}
          alt=""
        />
        <div className="absolute top-[64px] left-[30px] md:left-[110px] md:w-3/4">
          <h1 className="text-2xl md:text-[96px] text-white font-bold leading-loose">
            Tentang Kami
          </h1>
          <div
            className="text-xs md:text-xl text-white tracking-wider mt-9 leading-loose"
            dangerouslySetInnerHTML={{ __html: aboutUs.description }}
          ></div>

          <div
            className={`rounded-[24px] py-3 px-6 text-xs md:text-lg font-bold cursor-pointer bg-white text-[#00391C] whitespace-nowrap w-min cursor-pointer mt-4 md:mt-[74px]`}
            onClick={() => navigate('/about/detail')}
          >
            Detail
          </div>
        </div>
      </div>
      <div className="w-full px-[30px] flex md:px-[110px] flex-col mt-[56px]">
        {Object.keys(ourTeam).map((item, index) => (
          <div key={index} className={`${index !== 0 ? "mt-4 md:mt-[72px]" : ""}`}>
            <h1 className="bg-[#004723] px-4 py-3 text-white rounded-xl whitespace-nowrap w-min text-xs md:text-[28px] font-medium">
              {item}
            </h1>
            <div className="grid grid-cols-2 md:grid-cols-4 mt-3 md:mt-8">
              {ourTeam[item].map((person, idx) => (
                <Link className="md:w-[300px]" to={`/about/team/${person.id}`} key={idx}>
                  <div className="flex flex-col items-start">
                    <img
                      className="w-[135px] md:w-[300px] h-[180px] md:h-[300px] object-cover border rounded-lg"
                      src={person.image_url}
                      alt={person.name}
                      loading="lazy"
                    />
                    <h3 className="text-xs md:text-xl font-medium tracking-wider mt-4">
                      {person.name}
                    </h3>
                    {/* <h5 className="font-medium">{person.position}</h5> */}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TentangKami;
