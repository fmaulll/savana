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
import AuthorizedHeader from "./Authorized/Header";
import AuthorizedSidebar from "./Authorized/Sidebar";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
);

const Layout = ({ children }) => {
  const { loading, message, status, user, setUser, setMessage, setStatus, setLoading } =
    useContext(LayoutContext);
  const { pathname } = useLocation();
  const [openNewPost, setOpenNewPost] = useState(false);

  return (
    <div className="bg-white">
      {user ? (
        <Fragment>
          <AuthorizedHeader />
          <AuthorizedSidebar />
          <div className="pt-[195px] pl-[300px] px-9">
            {children} 
          </div>
        </Fragment>
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
              <div className="min-h-screen">{children}</div>
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
