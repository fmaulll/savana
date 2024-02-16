import React, { Fragment, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { supabase } from "../../hooks/supabase";

const Career = () => {
  const navigate = useNavigate();
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const [careerData, setCareerData] = useState([]);

  const getCareerData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("Career").select().eq('active', true);
    if (data && data.length > 0) {
      setCareerData(data);
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
    getCareerData();
  }, []);
  return (
    <div className="pt-[180px] px-[110px]">
      {careerData.length > 0 && <p className="text-xl">
        Tersedia <span className="font-bold">{careerData.length} Job</span>
      </p>}
      {careerData.length > 0 ? (
        <Fragment>
          {careerData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between text-xl py-10 border-b"
            >
              <span>{item.role}</span>
              <div className="flex items-center">
                <div className="text-center mr-[72px]">
                  <span className="font-extrabold text-[#BCBCBC]">
                    Tipe Pekerjaan
                  </span>
                  <br />
                  <span>{item.job_type}</span>
                </div>
                <div className="text-center mr-[72px]">
                  <span className="font-extrabold text-[#BCBCBC]">
                    Sistem Kerja
                  </span>
                  <br />
                  <span>{item.working_arrangement}</span>
                </div>
                <Button
                  type="gray"
                  onClick={() => navigate(`/career/details/${item.id}`)}
                >
                  Detail
                </Button>
              </div>
            </div>
          ))}
        </Fragment>
      ) : (
        <p className="text-center text-xl text-[#7D7D7D]">No Job Available</p>
      )}
    </div>
  );
};

export default Career;
