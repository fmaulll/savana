import { createContext, FC, useEffect, useState } from "react";
import { supabase } from "../hooks/supabase";

const initialValue = {
  user: null,
  status: false,
  message: "",
  loading: false,
  accessToken: "",
  refreshToken: "",
  language: "ID",
  setLanguage: () => {},
  setLoading: () => {},
  setMessage: () => {},
  setStatus: () => {},
  setAction: () => {},
  setAccessToken: () => {},
  setRefreshToken: () => {},
  setUser: () => {},
};

export const LayoutContext = createContext(initialValue);

const { Provider } = LayoutContext;

const LayoutProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");
  const [language, setLanguage] = useState("ID");

  const setAction = (callback) => {
    callback();
  };

  useEffect(() => {
    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (data.session) {
        setUser(data);
      }

      if (error) {
        alert(error);
      }
    };
    getSession();
  }, []);

  return (
    <Provider
      value={{
        user,
        loading,
        message,
        status,
        accessToken,
        refreshToken,
        language,
        setLanguage,
        setLoading,
        setMessage,
        setStatus,
        setAction,
        setAccessToken,
        setRefreshToken,
        setUser,
      }}
    >
      {children}
    </Provider>
  );
};

export default LayoutProvider;
