"use client";
import "./manage.css";
import { useAppContext } from "@/context/AppContext";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import { changeDataEvents } from "@/services/events";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getEvents,
  processData,
  inviteContact,
  getParticipantsBalances,
} from "@/services/events";
import { createActivity, getActivity } from "@/services/activities";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ModalCreate } from "@/components/modalCreate/ModalCreate";
import { ActivityCard } from "@/components/activityCard/ActivityCard";
import LineTable from "@/components/lineTable/LineTable";

//import { EventCard } from "@/components/eventCard/EventCard";

const postData = [
  {
    label: "Email",
    type: "email",
    name: "email",
    id: "email",
    placeholder: "Correo electrónico",
  },
];

const postDataCreateActivity = [
  {
    label: "Nombre",
    type: "text",
    name: "nombre",
    id: "nombre",
    placeholder: "Nombre de la actividad",
  },
  {
    label: "Descripcion",
    type: "text",
    name: "descripcion",
    id: "descripcion",
    placeholder: "Descripcion",
  },
  {
    label: "Valor de la actividad",
    type: "number",
    name: "valor",
    id: "valor",
    placeholder: "Valor de la actividad",
  },
];

export default function Manage({ params }) {
  const { appState, setAppState } = useAppContext();
  const [imageEvent, setImageEvent] = useState("/images/avatar.jpg");
  const [originalData, setOriginalData] = useState(null);
  const [data, setData] = useState(null);
  const [changeData, setChangeData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [addActivity, setAddActivity] = useState(false);
  const [myActivity, setMyActivity] = useState(null);
  const [balances, setBalances] = useState(null);

  const closeModal = (notification) => {
    setAddContact(false);
    setAddActivity(false);
    setReload(!reload);
    if (notification) {
      notify("Tu petición ha terminado exitosamente");
    }
  };

  useEffect(() => {
    async function myEvents() {
      const response = await getEvents();
      setMyActivity(response.eventos_creador);
      const event = processData(response, params.id_event);
      setOriginalData(event);
      setData(event);
      const activity = await getActivity(params.id_event);
      setMyActivity(activity.data);
      const getBalances = await getParticipantsBalances(params.id_event);
      const balacesArray = Object.entries(getBalances.data.saldos);
      setBalances(balacesArray);
      setLoading(false);
    }
    myEvents();
  }, [reload]);

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      evento_id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      tipo: data.tipo,
      foto: imageEvent,
    };
    const dataPut = await changeDataEvents(newData);
    setChangeData(false);
    notify("Datos actualizados con éxito");
    setReload(!reload);
  };

  return (
    <div className="Manage">
      <Topbar />
      <Header
        title={"EVENTOS"}
        information={"Gestiona la información de tus eventos"}
      />
      <div className="container">
        {loading ? (
          <></>
        ) : (
          <>
            <div className="info_event">
              <form className="data" onSubmit={handleSubmit}>
                <input
                  type="text"
                  id="title"
                  value={`${changeData ? data.nombre : originalData.nombre}`}
                  disabled={!changeData}
                  onChange={(e) => {
                    setData({ ...data, nombre: e.target.value });
                  }}
                  className={`${changeData ? "changeData" : ""}`}
                />
                <textarea
                  name="description"
                  id="description"
                  value={`${
                    changeData ? data.descripcion : originalData.descripcion
                  }`}
                  disabled={!changeData}
                  onChange={(e) => {
                    setData({ ...data, descripcion: e.target.value });
                  }}
                  className={`${changeData ? "changeData" : ""}`}
                ></textarea>
                <p>{originalData.tipo}</p>
                {changeData ? (
                  <div className="changeData_buttons">
                    <button
                      className="cancel"
                      onClick={() => {
                        setChangeData(false);
                        setData(originalData);
                      }}
                    >
                      Cancelar
                    </button>
                    <button type="submit">Guardar cambios</button>
                  </div>
                ) : originalData.creator == "me" ? (
                  <button
                    onClick={() => {
                      setChangeData(true);
                    }}
                  >
                    Editar datos
                  </button>
                ) : null}
              </form>
              <div className="image">
                <label htmlFor="file-input">
                  <img
                    // src={`${avatar != null ? avatar : "/images/avatar.jpg"}`}
                    src={imageEvent}
                    alt="avatar"
                  />
                </label>
                {changeData ? <h4>Cambiar avatar</h4> : null}
                <input
                  id="file-input"
                  name="avatar"
                  type="file"
                  placeholder="Avatar"
                  accept="/image/*"
                  disabled={!changeData}
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file.type.substring(0, 5) === "image") {
                      setImageEvent(URL.createObjectURL(file));
                    } else {
                      setImageEvent(null);
                    }
                  }}
                  required
                />
              </div>
            </div>
            <div className="participants">
              <h1>Participantes del evento</h1>
              <div className="balances">
                {balances != null
                  ? balances.map((item) => {
                      return (
                        <LineTable
                          id_event={params.id_event}
                          name={item[0]}
                          saldo={item[1][0]}
                          id_user={item[1][1]}
                        />
                      );
                    })
                  : null}
              </div>
            </div>
            <div className="group">
              <div>
                <h1 className="title">Actividades</h1>
                <div className="cards">
                  {myActivity != null
                    ? myActivity.map((item) => {
                        return (
                          <ActivityCard
                            key={item.id}
                            idEvent={params.id_event}
                            id={item.id}
                            name={item.nombre}
                            description={item.descripcion}
                            value={item.valor}
                            funcion={closeModal}
                          />
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          </>
        )}
        <div className="cards_events"></div>
        <div
          className="createActivity"
          onClick={() => {
            setAddActivity(true);
          }}
        ></div>
        <button
          className="button-add"
          onClick={() => {
            setAddContact(true);
          }}
        >
          <AiOutlineUserAdd />
        </button>
      </div>
      {addContact ? (
        <ModalCreate
          onCloseModal={closeModal}
          axios={inviteContact}
          fields={postData}
          buttonName={"Añadir contacto"}
          title={"Añadir un contacto a este evento"}
          additionalFields={{ evento_id: params.id_event }}
        />
      ) : null}
      {addActivity ? (
        <ModalCreate
          onCloseModal={closeModal}
          axios={createActivity}
          fields={postDataCreateActivity}
          buttonName={"Crear actividad"}
          title={"Crear una nueva actividad en este evento"}
          additionalFields={{ evento: params.id_event }}
        />
      ) : null}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
