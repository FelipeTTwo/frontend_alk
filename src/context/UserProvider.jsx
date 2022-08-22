import axios from "axios";
import { createContext, useEffect, useState } from "react";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [online, setOnline] = useState(false);
  const [upload, setUpload] = useState(false);
  const [idUser, setIdUser] = useState("");

  useEffect(() => {
    readToken();
  }, []);

  const readToken = async () => {
    const res = await axios({
      method: "get",
      url: "https://alkemyapp.herokuapp.com/users",
      withCredentials: true,
    });
    if (res.data.isToken) {
      setOnline(true);
      setIdUser(res.data.idUser);
    } else {
      setOnline(null);
    }
  };
  return (
    <UserContext.Provider
      value={{
        online,
        setOnline,
        upload,
        setUpload,
        idUser,
        setIdUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
