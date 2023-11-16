"use client";
import { useEffect, useState } from "react";
import "./addContactActivity.css";
import { getActivityParticipants, addParticipant } from "@/services/activities";
import { getEventParticipants } from "@/services/events";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddContactActivity({
  idEvent,
  idActivity,
  changePage,
}) {
  const [participants, setParticipants] = useState(null);
  const [personasSeleccionadas, setPersonasSeleccionadas] = useState([]);

  const sendData = async () => {
    const data = {
      actividad: idActivity,
      participantes: personasSeleccionadas,
    };
    console.log(data);
    const response = await addParticipant(data);
    console.log(response);
    changePage(true);
  };

  useEffect(() => {
    async function getParticipants() {
      const response = await getEventParticipants(idEvent);
      console.log(response);
      setParticipants(response);
    }
    getParticipants();
  }, []);

  return (
    <div className="AddContactActivity">
      <div className="container_modalAdd">
        <h1>Agrega contactos a esta actividad</h1>
        <div className="contacts">
          <ul>
            {participants != null ? (
              participants.participantes.length != 0 ? (
                participants.participantes.map((item) => (
                  <li key={item.participante}>
                    <input
                      type="checkbox"
                      checked={personasSeleccionadas.includes(
                        item.participante
                      )}
                      onChange={() =>
                        setPersonasSeleccionadas(
                          personasSeleccionadas.includes(item.participante)
                            ? personasSeleccionadas.filter(
                                (p) => p !== item.participante
                              )
                            : [...personasSeleccionadas, item.participante]
                        )
                      }
                    />
                    <p>
                      {"Diego Fernando"} {"Chaverra Castillo"}{" "}
                      {item.participante}
                    </p>
                  </li>
                ))
              ) : (
                <p>
                  Este evento no tiene participantes, por defecto se te asignará
                  a tí la actividad
                </p>
              )
            ) : null}
          </ul>
        </div>
        {participants != null ? (
          participants.participantes.length != 0 ? (
            <div className="buttons_send">
              <button onClick={() => changePage(false)}>Cancelar</button>
              <button onClick={sendData}>Enviar datos</button>
            </div>
          ) : (
            <div className="buttons_send">
              <button onClick={() => changePage(false)}>Cancelar</button>
              <button
                onClick={() => {
                  personasSeleccionadas.includes(participants.creador);
                  sendData();
                }}
              >
                Enviar datos
              </button>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
}
