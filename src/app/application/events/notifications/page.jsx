'use client'
import "./notifications.css";
import { useState, useEffect } from "react";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { getNotifications } from "@/services/notifications";
import NotificationCardPage from "@/components/notificationCardPage/NotificationCardPage";

export default function Notifications() {
  const [dataNotifications, setDataNotifications] = useState(null);
  const [reload, setReload] = useState(false);

  function onCloseModal() {
    setReload(!reload)
  }

  useEffect(() => {
    async function getData() {
      const data = await getNotifications();
      setDataNotifications(data);
    }
    getData();
  }, [reload,]);

  return (
    <div className="Notifications">
      <Topbar />
      <Header
        title={"Notificaciones"}
        information={"Eventos a los que he sido invitado"}
      />
      <div className="container">
        <div className="cards">
        {dataNotifications != null &&
          dataNotifications.invitations.length != 0 ? (
            dataNotifications.invitations.map((item) => {
              if (!item.aceptado) {
                return (
                  <NotificationCardPage
                    key={item.evento.id}
                    id={item.evento.id}
                    name={item.evento.nombre}
                    description={item.evento.descripcion}
                    type={item.evento.tipo}
                    image={item.evento.foto}
                    onClose={onCloseModal}
                  />
                );
              }
            })
          ) : (
            null
          )}
        </div>
      </div>
    </div>
  );
}
