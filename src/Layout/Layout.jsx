import { FC, Fragment, useContext, useEffect } from "react";
import { LayoutContext } from "../context/LayoutContext";
import ModalLoader from "../components/ModalLoader";
import ModalSuccessFailed from "../components/ModalSuccessFailed";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import Header from "./Header";
import Footer from "./Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const Layout = ({ children }) => {
  const { loading, message, status, user, setUser, setMessage, setStatus } =
    useContext(LayoutContext);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [openNewPost, setOpenNewPost] = useState(false);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      alert(error);
    }
    setUser(null);
    navigate("/admin/login");
  };

  return (
    <div className="bg-white">
      {user ? (
        <div>
          {children} <button onClick={handleLogout}>logout</button>
        </div>
      ) : (
        <Fragment>
          {pathname === "/" ? (
            <Fragment>
              <Header />
              <div className="min-h-screen">{children}</div>
              <Footer />
            </Fragment>
          ) : pathname === "/admin/login" ? (
            <div className="min-h-screen">{children}</div>
          ) : (
            <Fragment>
              <Header />
              <div className="min-h-screen pt-[180px]">{children}</div>
              <Footer />
            </Fragment>
          )}
        </Fragment>
      )}
      {loading ? <ModalLoader /> : null}
      {message ? (
        <ModalSuccessFailed
          status={status}
          message={message}
          onClose={() => {
            setMessage("");
            setStatus(false);
          }}
        />
      ) : null}
    </div>
  );
};

export default Layout;
