"use client";
import "./lineTable.css";
import { useState } from "react";
import { BsTrash } from "react-icons/bs";
import { FaRegUser } from "react-icons/fa";
import { RxOpenInNewWindow } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import { ModalCreate } from "../modalCreate/ModalCreate";
import { eliminateParticipantEvent } from "@/services/events";
import Link from "next/link";
import { formatNumber } from "@/services/generalServices";

export default function LineTable({
  id_event,
  id_user,
  name,
  saldo,
  participa,
  idCreador,
  idLog,
  funcion,
}) {
  const [constDeleteParticipant, setDeleteParticipant] = useState(false);

  const closeModal = () => {
    setDeleteParticipant(false);
    funcion(true);
  };

  function getColor(saldoActual) {
    let color = "";
    if (saldoActual > 0) {
      color = "green";
    } else if (saldoActual < 0) {
      color = "red";
    }

    return color;
  }

  return (
    <div className="LineTable">
      <p>{name}</p>
      <p className={`${getColor(saldo)}`}>{"$ " + formatNumber(saldo < 0 ? saldo * -1 : saldo)}</p>
      {!participa && idCreador == null && id_user != idLog ? (
        <BsTrash
          className="trash"
          onClick={() => {
            setDeleteParticipant(true);
          }}
        ></BsTrash>
      ) : (
        <Link
          href={{
            pathname: `/application/events/${id_event}/balancesEvent`,
            query: { user: id_user },
          }}
        >
          <RxOpenInNewWindow />
        </Link>
      )}

      {constDeleteParticipant ? (
        <ModalCreate
          onCloseModal={closeModal}
          axios={eliminateParticipantEvent}
          buttonName={"Eliminar Participante"}
          title={"¿Estas seguro de que deseas eliminar este participante?"}
          additionalFields={{ evento: id_event, contacto: id_user }}
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
