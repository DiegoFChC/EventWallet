import "./notificationCardPage.css";
import Image from "next/image";
import { postNotifications } from "@/services/notifications";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NotificationCardPage({
  id,
  name,
  description,
  type,
  image,
  onClose
}) {
  async function respond(res) {
    const data = { invitacion_id: id, respuesta: res };
    const response = await postNotifications(data);
    console.log(response)
    notifySuccess(response.informacion);
    onClose()
  }

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

  return (
    <div className="NotificationCardPage">
      <div className="info">
        <div className="data">
          <h1>{name}</h1>
          <p>{description}</p>
          <h5>Tipo: {type}</h5>
        </div>
        <div className="img">
          <Image src="/images/avatar.jpg" alt="logo" width={80} height={80} />
        </div>
        <span>Pendiente</span>
      </div>
      <div className="buttons">
      <button
        onClick={() => {
          respond(true);
        }}
      >
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
