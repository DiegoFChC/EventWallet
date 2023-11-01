import "./eventCard.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";

export const EventCard = ({ id, name, description, type, photo, isMyEvent }) => {
  const { appState, setAppState } = useAppContext();
  const router = useRouter();

  return (
    <div className="EventCard">
      <div className="type">
        <button>{type}</button>
      </div>
      <div className="container_info">
        <div className="info">
          <div className="content">
            <h2>{name}</h2>
            <h1>{description}</h1>
            <div className="container_button">
              <button
                onClick={() => {
                  setAppState({
                    ...appState,
                    eventSelected: {
                      id: id,
                      name: name,
                      description: description,
                      type: type,
                      image: photo,
                      isMyEvent: isMyEvent,
                    },
                  });
                  router.push(`/application/events/${id}`);
                }}
              >
                Ver Más
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
