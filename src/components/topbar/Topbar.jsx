"use client";
import "./topbar.css";
import { IoMdSettings } from "react-icons/io";
import { BsBellFill } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { useEffect, useState } from "react";
import { getNotifications } from "@/services/notifications";
import NotificationCard from "../notificationCard/NotificationCard";
import Link from "next/link";

export function Topbar() {
  const [notifications, setNotifications] = useState(false);
  const [dataNotifications, setDataNotifications] = useState(null);
  const [countNotifications, setCountNotifications] = useState(0);

  useEffect(() => {
    async function getData() {
      const data = await getNotifications();
      setDataNotifications(data);
      // console.log("Mis invitaciones", data);
      setCountNotifications(data.invitations.length);
      // console.log("Numero", countNotifications);
    }
    getData();
  }, [notifications]);

  return (
    <div className="Topbar">
      <nav>
        <button>
          <IoMdSettings />
        </button>
        <button
          onClick={() => {
            setNotifications(!notifications);
          }}
        >
          <BsBellFill />
          {countNotifications != 0 ? <p>{countNotifications}</p> : null}
        </button>
        <Link href={"/"}>
          <CgProfile />
        </Link>
      </nav>
      {notifications ? (
        <div className={"showNotifications"}>
          {dataNotifications != null &&
          dataNotifications.invitations.length != 0 ? (
            dataNotifications.invitations.map((item) => {
              if (!item.aceptado) {
                return (
                  <NotificationCard
                    key={item.evento.id}
                    title={item.evento.nombre}
                    description={item.evento.descripcion}
                  />
                );
              }
            })
          ) : (
            <div className="no-notifications">
              <p>No hay notificaciones</p>
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
}
