"use client";
import "./lineTable.css";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { ToastContainer, toast } from "react-toastify";
import { ModalCreate } from "../modalCreate/ModalCreate";
import { eliminateParticipantEvent } from "@/services/events";

export default function LineTable({ id_event, name, saldo, id_user, funcion }) {
  const [constDeleteParticipant, setDeleteParticipant] = useState(false);

  const closeModal = () => {
    setDeleteParticipant(false);
    funcion(true);
  };

  return (
    <div className="LineTable">
      <p>{name}</p>
      <p>{"$ " + saldo}</p>



        <BsTrash onClick={() => {
          setDeleteParticipant(true);
        }}></BsTrash>

      {constDeleteParticipant ? (
        <ModalCreate
          onCloseModal={closeModal}
          axios={eliminateParticipantEvent}
          buttonName={"Eliminar Participante"}
          title={"¿Estas seguro de que deseas eliminar este participante?"}
          additionalFields={{evento: id_event, contacto: id_user }}
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
