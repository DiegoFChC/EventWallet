"use client";
import "./notificationCard.css";
import Link from "next/link";
import Loader from "../loader/Loader";
import { useState } from "react";

export default function NotificationCard({ title, description }) {
  const [changePage, setChangePage] = useState(false);

  return (
    <div className="NotifiactionCard">
      <Link
        href="/application/events/notifications"
        onClick={() => {
          setChangePage(true);
        }}
      >
        {changePage ? <Loader /> : null}
        <h1>Te han invitado a un evento!!!</h1>
        <h2>
          Título: <span>{title}</span>
        </h2>
        <h2>
          Descripción: <span>{description}</span>
        </h2>
      </Link>
    </div>
  );
}
