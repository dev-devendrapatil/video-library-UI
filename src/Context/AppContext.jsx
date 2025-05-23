// src/context/AppContext.js
import { createContext, useContext, useState } from "react";

// Create context
export const AppContext = createContext();

// Create provider
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // example state
  const [uploadedVideo, setUploadedVideo] = useState(null)

  return <AppContext.Provider value={{ user,setUser ,uploadedVideo, setUploadedVideo}}>{children}</AppContext.Provider>;
};
