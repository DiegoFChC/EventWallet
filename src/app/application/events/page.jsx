"use client";
import { useEffect, useState } from "react";
import "./events.css";
import { Header } from "@/components/header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { newEvents } from "@/services/events.post";
import { ModalCreate } from "@/components/modalCreate/ModalCreate";
import { Topbar } from "@/components/topbar/Topbar";
import { BsBellFill } from "react-icons/bs";
import Link from "next/link";

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
  {
    label: "Foto",
    type: "text",
    name: "foto",
    id: "foto",
    placeholder: "Imagen",
  },
];

export default function Events() {
  const [createEvent, setCreateEvent] = useState(false);
  const [events, setEvents] = useState(null);
  const [reaload, setReload] = useState(false);

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

  return (
    <div className="Events">
      <Topbar />
      <Header
        title={"Eventos"}
        information={"Aquí puedes administrar tus eventos"}
      />
      <div className="container">
        <div className="cards"></div>
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
