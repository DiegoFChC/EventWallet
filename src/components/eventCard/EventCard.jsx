import "./eventCard.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import Loader from "../loader/Loader";

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
  const [changePage, setChangePage] = useState(false);

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
      <span className="type">{nameType}</span>
      <div className="container_info">
        <h1>{name}</h1>
        <h2>{description}</h2>
      </div>
      <div className="container_button">
        <button
          onClick={() => {
            router.push(`/application/events/${id}`);
            setChangePage(true);
          }}
          disabled={changePage ? true : false}
        >
          {changePage ? <Loader /> : null}
          Ver Más
        </button>
      </div>
    </div>
  );
};
