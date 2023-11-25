"use client";
import { useEffect, useState } from "react";
import "./events.css";
import { Header } from "@/components/header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { newEvents } from "@/services/events";
import { ModalCreate } from "@/components/modalCreate/ModalCreate";
import { Topbar } from "@/components/topbar/Topbar";
import { BsBellFill } from "react-icons/bs";
import Link from "next/link";
import { getEvents } from "@/services/events";
import { EventCard } from "@/components/eventCard/EventCard";
import { useAppContext } from "@/context/AppContext";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const postData = [
  {
    label: "Nombre",
    type: "text",
    name: "nombre",
    id: "nombre",
    placeholder: "Nombre del evento",
  },
  {
    label: "Descripcion",
    type: "text",
    name: "descripcion",
    id: "descripcion",
    placeholder: "Descripcion",
    maxlength: 249
  },
  {
    label: "Tipo",
    type: "select",
    name: "tipo",
    id: "tipo",
    placeholder: "Tipo de evento",
    options: [
      { label: "Viaje", value: "V" },
      { label: "Hogar", value: "H" },
      { label: "Pareja", value: "P" },
      { label: "Comida", value: "C" },
      { label: "Otro", value: "O" },
    ],
  },
];

export default function Events() {
  const [createEvent, setCreateEvent] = useState(false);
  const [myEvents, setMyEvents] = useState(null);
  const [events, setEvents] = useState(null);
  const [reaload, setReload] = useState(false);
  const { appState, setAppState } = useAppContext();
  const router = useRouter();

  // console.log("contexto", appState);

  const notifySuccess = (message) => {
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

  const closeModal = (notify) => {
    setCreateEvent(false);
    setReload(!reaload);
    if (notify) {
      notifySuccess("Evento creado exitosamente");
    }
  };

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    }
    async function getData() {
      const data = await getEvents();
      setMyEvents(data.eventos_creador);
      // console.log(data.eventos_creador);
      setEvents(data.eventos_participante);
      // console.log(data.eventos_participante);
    }

    getData();
  }, [reaload,]);

  return (
    <div className="Events">
      <Topbar />
      <Header
        title={"Eventos"}
        information={"Aquí puedes administrar tus eventos"}
      />
      <div className="container">
        <div className="group">
          {
            <div>
              <h1 className="title">Mis eventos</h1>
              <div className="cards">
                {myEvents && myEvents.length > 0
                  ? myEvents.map((item) => {
                      return (
                        <EventCard
                          key={item.id}
                          id={item.id}
                          name={item.nombre}
                          description={item.descripcion}
                          type={item.tipo}
                          photo={item.foto}
                          isMyEvent={true}
                        />
                      );
                    })
                  :  <h3>No Tienes Eventos</h3>}
              </div>
            </div>
          }
        </div>
        <div className="group">
          {
            <div>
              <h1 className="title">Otros Eventos</h1>
              <div className="cards">
                {events && events.length > 0
                  ? events.map((item) => {
                      return (
                        <EventCard
                          key={item.evento.id}
                          id={item.evento.id}
                          name={item.evento.nombre}
                          description={item.evento.descripcion}
                          type={item.evento.tipo}
                          photo={item.evento.foto}
                          isMyEvent={false}
                        />
                      );
                    })
                  : <h3>No Tienes Eventos</h3>}
              </div>
            </div>
          }
        </div>
        <div
          className="createEvent"
          onClick={() => {
            setCreateEvent(true);
          }}
        ></div>
        <Link href="/application/events/notifications">
          <BsBellFill />
        </Link>
      </div>
      {createEvent ? (
        <ModalCreate
          onCloseModal={closeModal}
          axios={newEvents}
          title={"Crear nuevo evento"}
          fields={postData}
          buttonName={"Crear evento"}
          additionalFields={{ foto: '/images/otros.jpg'}}
        />
      ) : null}
      <ToastContainer
        position="top-center"
        autoClose={3000}
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
