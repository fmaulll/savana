import { FC, useContext } from "react";
import { LayoutContext } from "../context/LayoutContext";
import ModalLoader from "../components/ModalLoader";
import ModalSuccessFailed from "../components/ModalSuccessFailed";
import { useState } from "react";
import { BsPlus } from "react-icons/bs";
import Header from "./Header";
// import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const { loading, message, status, user, setMessage, setStatus } =
    useContext(LayoutContext);
  const [openNewPost, setOpenNewPost] = useState(false);
  return (
    <div className="bg-[#f0f0f0]">
      {user ? (
        <div className="min-h-screen relative">
          <Header />
          <div className="flex">
            {/* <Sidebar /> */}
            <div className="w-full px-[300px] py-[30px] mt-32 z-0 ml-[300px]">
              {children}
            </div>
          </div>
          <div
            onClick={() => setOpenNewPost(!openNewPost)}
            className="fixed right-0 bottom-0 p-2 rounded-full bg-white mr-4 mb-4 cursor-pointer shadow-xl"
          >
            <BsPlus size={60} />
          </div>
        </div>
      ) : (
        <div className="min-h-screen items-center">
          <Header />
          {children}
        </div>
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
