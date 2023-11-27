"use client";
import { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within a provider");
  }

  return context;
}

export function AppContextProvider({ children }) {
  let data = {
    user: {
      id: 1,
      name: "",
      lastname: "",
      nickname: "",
      foto: "",
    },
    navigationBar: {
      dashboard: "selected",
      events: "",
      contacts: "",
      deudas: "",
      profile: "",
    },
  };

  const [appState, setAppState] = useState(data);
  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}
