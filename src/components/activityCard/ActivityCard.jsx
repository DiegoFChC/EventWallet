import "./activityCard.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export const ActivityCard = ({ id, name, value }) => {
  const { appState, setAppState } = useAppContext();
  const router = useRouter();

  return (
    <div className="ActivityCard">
      <div className="container_info">
        <h1>{name}</h1>
        <p>Valor</p>
        <h2>
          $ <span>{value}</span>
        </h2>
      </div>
      <div className="container_button">
        <button>Ver Más</button>
      </div>
    </div>
  );
};
