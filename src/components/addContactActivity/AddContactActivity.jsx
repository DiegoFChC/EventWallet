"use client";
import { useEffect, useState } from "react";
import "./addContactActivity.css";
import {
  getActivityParticipants,
  addParticipant,
  assignValues,
} from "@/services/activities";
import { getEventParticipants } from "@/services/events";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CiCircleCheck } from "react-icons/ci";

export default function AddContactActivity({
  idEvent,
  idActivity,
  valueActivity,
  changePage,
}) {
  const [participants, setParticipants] = useState(null);
  const [participantsActivity, setParticipantsActivity] = useState(null);
  const [personasSeleccionadas, setPersonasSeleccionadas] = useState([]);
  const [step, setStep] = useState(1);
  const [tipoParticion, setTipoParticion] = useState("porcentaje");
  const [cuenta, setCuenta] = useState({
    limitPorcentaje: 100,
    limiteValor: valueActivity,
    porcentaje: 100,
    valor: valueActivity,
    tosend: {
      valor: 0,
      porcentaje: 0,
    },
  });
  const [valoresAsignados, setValoresAsginados] = useState([]);
  const [inputsDeshabilitados, setInputsDesabilitados] = useState([0]);
  const [valoresAuto, setValoresAuto] = useState(false);

  function isDisabled(id) {
    let exist = false;
    if (inputsDeshabilitados.length != 1) {
      inputsDeshabilitados.map((item) => {
        if (item == id) {
          exist = true;
        }
      });
    }
    return exist;
  }

  const sendDataStepOne = async () => {
    const data = {
      actividad: idActivity,
      participantes: personasSeleccionadas,
    };
    const response = await addParticipant(data);
    console.log(response);
    setStep(2);
  };

  async function handleSubmit(e, auto) {
    e.preventDefault();
    console.log(valoresAsignados);
    let valores = valoresAsignados;
    let participantesValores = [];
    valores.map((item) => {
      participantesValores.push({
        id: item.participante.id,
        value: item.datos.valor,
      });
    });
    console.log(participantesValores);
    let allParticipants = participants.participantes;
    let participantesValoresAuto = [];
    const numberParticipants = allParticipants.length;
    allParticipants.map((item) => {
      participantesValoresAuto.push({
        id: item.participante.id,
        value: valueActivity / numberParticipants,
      });
    });

    console.log(participantesValoresAuto);

    let data = {};
    if (valoresAuto) {
      data = { actividad: idActivity, participantes: participantesValoresAuto };
    } else {
      data = { actividad: idActivity, participantes: participantesValores };
    }
    const response = await assignValues(data);
    console.log(response);
    changePage(true);
  }

  useEffect(() => {
    async function getParticipants() {
      const response = await getEventParticipants(idEvent);
      setParticipants(response);
      console.log(response);
    }
    getParticipants();
    async function getParticipantsActivity() {
      const response = await getActivityParticipants(idEvent);
      const activity = response.data.filter(
        (item) => item.actividad == idActivity
      );
      setParticipantsActivity(activity[0]);
    }
    getParticipantsActivity();
  }, [step]);

  return (
    <div className="AddContactActivity">
      {step == 1 ? (
        <div className="container_modalAddA">
          <h1>Agrega contactos a esta actividad</h1>
          <div className="contacts">
            <ul>
              {participants != null ? (
                participants.participantes.length != 0 ? (
                  <>
                    <li key={participants.creador.id}>
                      <input
                        type="checkbox"
                        checked={personasSeleccionadas.includes(
                          participants.creador.id
                        )}
                        onChange={() =>
                          setPersonasSeleccionadas(
                            personasSeleccionadas.includes(
                              participants.creador.id
                            )
                              ? personasSeleccionadas.filter(
                                  (p) => p !== participants.creador.id
                                )
                              : [
                                  ...personasSeleccionadas,
                                  participants.creador.id,
                                ]
                          )
                        }
                      />
                      <p>
                        {participants.creador.nombre}{" "}
                        {participants.creador.apellidos}
                      </p>
                    </li>
                    {participants.participantes.map((item) => (
                      <li key={item.participante.id}>
                        <input
                          type="checkbox"
                          checked={personasSeleccionadas.includes(
                            item.participante.id
                          )}
                          onChange={() =>
                            setPersonasSeleccionadas(
                              personasSeleccionadas.includes(
                                item.participante.id
                              )
                                ? personasSeleccionadas.filter(
                                    (p) => p !== item.participante.id
                                  )
                                : [
                                    ...personasSeleccionadas,
                                    item.participante.id,
                                  ]
                            )
                          }
                        />
                        <p>
                          {item.participante.nombre}{" "}
                          {item.participante.apellidos}
                        </p>
                      </li>
                    ))}
                  </>
                ) : (
                  <p>
                    Este evento no tiene participantes, por defecto se te
                    asignará a tí la actividad
                  </p>
                )
              ) : null}
            </ul>
          </div>
          {participants != null ? (
            participants.participantes.length != 0 ? (
              <div className="buttons_send">
                <button onClick={() => changePage(false)}>Cancelar</button>
                <button onClick={sendDataStepOne}>Siguiente</button>
              </div>
            ) : (
              <div className="buttons_send">
                <button onClick={() => changePage(false)}>Cancelar</button>
                <button
                  onClick={() => {
                    personasSeleccionadas.includes(participants.creador);
                    sendDataStepOne();
                  }}
                >
                  Siguiente
                </button>
              </div>
            )
          ) : null}
        </div>
      ) : (
        <div className="container_modalAddB">
          <h1>Asignando participación</h1>
          <p>
            A continuación agrega el porcentaje o el valor en dinero que quieres
            asignar a cada participante
          </p>
          <span>
            Si no desea agregar los valores manualmente, por defecto se
            asignaran valores a cada usuario en partes iguales
          </span>
          <div className="selection">
            <button
              onClick={() => {
                setTipoParticion("fijo");
              }}
            >
              Valor fijo
            </button>
            <button
              onClick={() => {
                setTipoParticion("porcentaje");
              }}
            >
              Porcentaje
            </button>
          </div>
          <form className="users" onSubmit={handleSubmit}>
            <div className="lines">
              {participantsActivity != null
                ? participantsActivity.participantes.map((item) => {
                    const porcentajeG = cuenta.porcentaje;
                    const totalAtividad = valueActivity;
                    let data = {
                      valor: 0,
                      porcentaje: 0,
                    };
                    return (
                      <div key={item.participante.id} className="formChild">
                        <input
                          type="text"
                          value={
                            item.participante.nombre +
                            " " +
                            item.participante.apellidos
                          }
                          readOnly
                        />
                        {tipoParticion == "porcentaje" ? (
                          <input
                            type="number"
                            placeholder={`0 - ${
                              cuenta.porcentaje - data.porcentaje
                            }`}
                            onChange={(e) => {
                              data = {
                                valor: valueActivity * (e.target.value / 100),
                                porcentaje: e.target.value,
                              };
                              setCuenta({
                                ...cuenta,
                                porcentaje:
                                  cuenta.limitPorcentaje - data.porcentaje,
                                tosend: data,
                              });
                            }}
                            readOnly={isDisabled(item.participante.id)}
                          />
                        ) : (
                          <input
                            type="number"
                            placeholder={`$ 0 - ${cuenta.valor - data.valor}`}
                            onChange={(e) => {
                              data = {
                                valor: e.target.value,
                                porcentaje:
                                  (e.target.value * 100) / totalAtividad,
                              };
                              setCuenta({
                                ...cuenta,
                                valor: cuenta.limiteValor - data.valor,
                                tosend: data,
                              });
                            }}
                            readOnly={isDisabled(item.participante.id)}
                          />
                        )}
                        <CiCircleCheck
                          onClick={() => {
                            if (valoresAsignados.length != 0) {
                              let values = valoresAsignados;
                              values.push({
                                participante: item.participante,
                                datos: cuenta.tosend,
                              });
                              setValoresAsginados(values);
                              setCuenta({
                                valor: cuenta.limiteValor - cuenta.tosend.valor,
                                limitPorcentaje:
                                  cuenta.limitPorcentaje -
                                  cuenta.tosend.porcentaje,
                                limiteValor:
                                  cuenta.limiteValor - cuenta.tosend.valor,
                                porcentaje:
                                  cuenta.limitPorcentaje -
                                  cuenta.tosend.porcentaje,
                              });
                              let items = inputsDeshabilitados;
                              items.push(item.participante.id);
                              setInputsDesabilitados(items);
                            } else {
                              setValoresAsginados([
                                {
                                  participante: item.participante,
                                  datos: cuenta.tosend,
                                },
                              ]);
                              setCuenta({
                                valor: cuenta.limiteValor - cuenta.tosend.valor,
                                limitPorcentaje:
                                  cuenta.limitPorcentaje -
                                  cuenta.tosend.porcentaje,
                                limiteValor:
                                  cuenta.limiteValor - cuenta.tosend.valor,
                                porcentaje:
                                  cuenta.limitPorcentaje -
                                  cuenta.tosend.porcentaje,
                              });
                              let items = inputsDeshabilitados;
                              items.push(item.participante.id);
                              setInputsDesabilitados(items);
                            }
                          }}
                        />
                      </div>
                    );
                  })
                : null}
            </div>
            <div className="buttons">
              <button type="submit" onClick={() => setValoresAuto(true)}>
                Asignar automaticamente
              </button>
              <button type="submit">Aceptar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
