import "./eventCard.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export const EventCard = ({
  id,
  name,
  description,
  type,
  photo,
  isMyEvent,
}) => {
  const { appState, setAppState } = useAppContext();
  const router = useRouter();

  const mapType = (type) => {
    switch (type) {
      case "V":
        return "Viajes";
      case "H":
        return "Hogar";
      case "P":
        return "Pareja";
      case "C":
        return "Comida";
      case "O":
        return "Otros";
      default:
        return type; // si no se encuentra una coincidencia
    }
  };

  const nameType = mapType(type);

  return (
    <div className="EventCard">
      <div className="type">
        <button>{nameType}</button>
      </div>
      <div className="container_info">
        <div className="info">
          <div className="content">
            <div className="text">
              <h2>
                <span>{name}</span>
              </h2>
            </div>
            <div className="text">
              <h1>
                <span>{description}</span>
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div className="container_button">
        <button
          onClick={() => {
            router.push(`/application/events/${id}`);
          }}
        >
          Ver Más
        </button>
      </div>
    </div>
  );
};
