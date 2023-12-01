'use client'
import "./notificationCardPage.css";
import Image from "next/image";
import { postNotifications } from "@/services/notifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Loader from "../loader/Loader";

export default function NotificationCardPage({
  id,
  name,
  description,
  type,
  image,
  onClose,
}) {
  const [loading, setLoading] = useState(false);

  async function respond(res) {
    const data = { invitacion_id: id, respuesta: res };
    const response = await postNotifications(data);
    onClose();
  }

  return (
    <div className="NotificationCardPage">
      <div className="info">
        <div className="data">
          <h1>{name}</h1>
          <p>{description}</p>
          <h5>Tipo: {type}</h5>
        </div>
        <div className="img">
          <Image src={image} alt="logo" width={80} height={80} />
        </div>
        <span>Pendiente</span>
      </div>
      <div className="buttons">
        <button
          onClick={() => {
            respond(true);
            setLoading(true)
          }}
        >
          {loading ? <Loader /> : null}
          Aceptar
        </button>
        <button
          onClick={() => {
            respond(false);
          }}
        >
          Rechazar
        </button>
      </div>
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
