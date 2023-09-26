import { createContext, FC, useEffect, useState } from "react";
import Cookies from "js-cookie";

const initialValue = {
  user: null,
  status: false,
  message: "",
  loading: false,
  accessToken: "",
  refreshToken: "",
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

  const setAction = (callback) => {
    callback();
  };

  useEffect(() => {
    const user = Cookies.get("user");
    
    if (user) {
      setUser(JSON.parse(user));
    };

    setAccessToken(Cookies.get("access_token"))
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