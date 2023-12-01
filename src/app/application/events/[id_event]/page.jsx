"use client";
import "./manage.css";
import { useAppContext } from "@/context/AppContext";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import {
  changeDataEvents,
  fusionarParticipantes,
  getEventParticipants,
} from "@/services/events";
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
import AvatarModal from "@/components/avatarModal/AvatarModal";
import Loader from "@/components/loader/Loader";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

function getTypeEvent(type) {
  if (type == "H") {
    return "Hogar";
  } else if (type == "V") {
    return "Viaje";
  } else if (type == "P") {
    return "Pareja";
  } else if (type == "C") {
    return "Comida";
  } else if (type == "O") {
    return "Otros";
  }
}

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
    maxlength: 249,
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
  const [originalData, setOriginalData] = useState(null);
  const [data, setData] = useState(null);
  const [changeData, setChangeData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [addActivity, setAddActivity] = useState(false);
  const [myActivity, setMyActivity] = useState(null);
  const [balances, setBalances] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idLog, setIdLog] = useState(null);
  const [idCreador, setIdCreador] = useState(null);
  const [loadingPage, setLoadingPage] = useState(true);
  const router = useRouter();

  const handleSelectAvatar = (selectedAvatar) => {
    setIsModalOpen(false);
    setData({ ...data, foto: selectedAvatar });
  };

  const handleOpenModal = () => {
    if (changeData) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const closeModal = (notification) => {
    setAddContact(false);
    setAddActivity(false);
    setReload(!reload);
    if (notification) {
      notify("Tu petición ha terminado exitosamente");
    }
  };

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    } else {
      async function myEvents() {
        const responseEvents = await getEvents();
        const event = processData(responseEvents, params.id_event);
        setOriginalData(event);
        setData(event);
        setIdCreador(event.creador);
        const activity = await getActivity(params.id_event);
        setMyActivity(activity.data);
        setIdLog(activity.user);
        const getBalances = await getParticipantsBalances(params.id_event);
        setBalances(getBalances.data);
        setLoading(false);
        setLoadingPage(false);
      }
      myEvents();
    }
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
      foto: data.foto,
    };
    const dataPut = await changeDataEvents(newData);
    setChangeData(false);
    notify("Datos actualizados con éxito");
    setReload(!reload);
  };

  return loadingPage ? (
    <Loader />
  ) : (
    <div className="Manage">
      {loadingPage ? <Loader /> : null}
      <Topbar />
      <Header
        title={"EVENTOS"}
        information={"Gestiona la información de tus eventos"}
        back={"/application/events"}
      />
      <div className="container">
        {loading ? (
          <></>
        ) : (
          <>
            <div className="encabezado">
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
                  <p>{getTypeEvent(originalData.tipo)}</p>
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
                  ) : originalData.creator == "me" && myActivity.length == 0 ? (
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
                  <label htmlFor="file-input" onClick={handleOpenModal}>
                    <img
                      src={`${changeData ? data.foto : originalData.foto}`}
                      alt="avatar"
                    />
                  </label>
                  {isModalOpen && (
                    <AvatarModal
                      onSelectAvatar={handleSelectAvatar}
                      onClose={handleCloseModal}
                      type={"events"}
                    />
                  )}
                </div>
              </div>
              <div className="participants">
                <h1>Participantes del evento - Saldos</h1>
                <div className="balances">
                  {balances && balances.saldos.length > 0 ? (
                    balances.saldos.map((item) => {
                      return (
                        <LineTable
                          key={item.usuario_id}
                          id_event={params.id_event}
                          id_user={item.usuario_id}
                          name={item.nombre}
                          saldo={item.balance}
                          participa={item.participa}
                          idCreador={idCreador}
                          idLog={idLog}
                          funcion={closeModal}
                        />
                      );
                    })
                  ) : (
                    <h3>No Hay Participantes</h3>
                  )}
                </div>
              </div>
            </div>
            <div className="group">
              <div>
                <h1 className="title">Actividades</h1>
                <div className="cards">
                  {myActivity && myActivity.length > 0 ? (
                    myActivity.map((item) => {
                      return (
                        <ActivityCard
                          key={item.id}
                          idEvent={params.id_event}
                          id={item.id}
                          name={item.nombre}
                          description={item.descripcion}
                          value={item.valor}
                          creador={item.creador}
                          idLog={idLog}
                          funcion={closeModal}
                        />
                      );
                    })
                  ) : (
                    <h3>No Hay Actividades</h3>
                  )}
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
          title="Crear actividad"
        ></div>
        {idCreador == null ? (
          <button
            className="button-add"
            onClick={() => {
              setAddContact(true);
            }}
            title="Añadir nuevo participante"
          >
            <AiOutlineUserAdd />
          </button>
        ) : null}
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
