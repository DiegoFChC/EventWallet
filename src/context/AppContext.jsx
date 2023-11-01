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
    navigationBar: {
      dashboard: "selected",
      events: "",
      contacts: "",
      deudas: "",
      profile: "",
    },
    eventSelected: {
      id: 1,
      name: "Prueba de evento",
      description:
        "Esta es una descripción de prueba para este evento inexistente. Esta es una descripción de prueba para este evento inexistente. Esta es una descripción de prueba para este evento inexistente.",
      type: "H",
      image: "image",
      isMyEvent: true,
    },
  };

  const [appState, setAppState] = useState(data);
  return (
    <AppContext.Provider value={{ appState, setAppState }}>
      {children}
    </AppContext.Provider>
  );
}
