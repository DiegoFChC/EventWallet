import "./eventCard.css";
import { useState } from "react";

export const EventCard = ({ name, description, type }) => {
  return (
    <div className="EventCard">
      <div className="container_info">
        <div className="info">
          <h2>{name}</h2>
          <h1>{description}</h1>
          <p>
            <span>{type}</span>
          </p>
          <div className="container_button">
            <button>Ver Mas</button>
          </div>
        </div>
      </div>
    </div>
  );
};
