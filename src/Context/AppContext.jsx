// src/context/AppContext.js
import { createContext, useContext, useState } from "react";

// Create context
const AppContext = createContext();

// Create provider
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null); // example state

  return <AppContext.Provider value={{ user }}>{children}</AppContext.Provider>;
};
