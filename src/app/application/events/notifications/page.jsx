"use client";
import "./notifications.css";
import { useState, useEffect } from "react";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { getNotifications } from "@/services/notifications";
import NotificationCardPage from "@/components/notificationCardPage/NotificationCardPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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

export default function Notifications() {
  const [dataNotifications, setDataNotifications] = useState(null);
  const [reload, setReload] = useState(false);
  const router = useRouter();

  function onCloseModal() {
    notifySuccess("Respuesta enviada satisfactoriamente");
    setReload(!reload);
  }

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    }
    async function getData() {
      const data = await getNotifications();
      setDataNotifications(data);
    }
    getData();
  }, [reload]);

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
    <div className="Notifications">
      <Topbar />
      <Header
        title={"Notificaciones"}
        information={"Eventos a los que he sido invitado"}
        back={"/application/events"}
      />
      <div className="container">
        <div className="cards">
          {dataNotifications != null &&
          dataNotifications.invitations.length != 0
            ? dataNotifications.invitations.map((item) => {
                if (!item.aceptado) {
                  return (
                    <NotificationCardPage
                      key={item.evento.id}
                      id={item.id}
                      name={item.evento.nombre}
                      description={item.evento.descripcion}
                      type={getTypeEvent(item.evento.tipo)}
                      image={item.evento.foto}
                      onClose={onCloseModal}
                    />
                  );
                }
              })
            : null}
        </div>
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
