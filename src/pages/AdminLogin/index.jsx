import React, { useContext, useState } from "react";
import SavanaLogo from "../../assets/savanaBig.png";
import Background from "../../assets/Background.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { LayoutContext } from "../../context/LayoutContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../hooks/supabase";

const AdminLogin = () => {
  const { setLoading, setMessage, setStatus, setUser } =
    useContext(LayoutContext);
  const navigate = useNavigate();
  const [dataRequest, setDataRequest] = useState({
    email: "",
    password: "",
  });

  const handleChange = (key, value) => {
    setDataRequest((prev) => {
      return {
        ...prev,
        [key]: value,
      };
    });
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword(dataRequest);
    if (data.user) {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        setUser(data);
      }

      if (error) {
        alert(error);
      }
      setLoading(false);
      setMessage("Login Success");
      setStatus(true);
      setTimeout(() => {
        setMessage("");
        navigate("/admin/dashboard");
        return;
      }, 2000);
    }
    if (error) {
      setLoading(false);
      setMessage(error.message);
      setStatus(false);
      return;
    }
  };

  return (
    <div
      className="h-screen bg-cover flex flex-col justify-between"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="flex justify-between py-3 px-[30px] md:px-[100px] items-center bg-white">
        <img
          className="w-[110px] h-[86px]"
          src={SavanaLogo}
          alt="Savana Logo"
        />
        <div>HOME</div>
      </div>
      <div className="flex justify-center items-center flex-col">
        <form className="[&>*]:mb-4" onSubmit={login}>
          <Input
            placeholder="USERNAME"
            type="email"
            onChange={(e) => handleChange("email", e.target.value)}
          />
          <Input
            placeholder="PASSWORD"
            type="password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
          <Button>Submit</Button>
        </form>
      </div>
      <div className="h-[97px] bg-[#002B15] flex justify-center items-end px-[70px]">
        <p className="text-sm font-normal text-white py-4 border-t-2 border-[#007A24] w-full text-center">
          Copyright PT. Savana Anugerah lestari 2023. All Right Reserved
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
