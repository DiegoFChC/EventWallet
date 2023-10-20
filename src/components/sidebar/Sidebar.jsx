"use client";
import Image from "next/image";
import "./sidebar.css";
import Link from "next/link";
import { useState } from "react";

export const Sidebar = () => {
  const [linkSelected, setLinkSelected] = useState({
    dashboard: "selected",
    events: "",
    contacts: "",
    deudas: "",
    profile: "",
  });
  // const [isCollapsed, setIsCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  return (
    <nav className="Sidebar">
      <div className="container">
        <header>
          <div className="image-text">
            <Image
              src="/images/logo-blue.png"
              alt="logo"
              width={45}
              height={27}
            />
            <span className="title">Event Wallet</span>
          </div>
          <hr />
          <div className="links">
            <Link
              href="/application"
              className={`${linkSelected.dashboard}`}
              onClick={() => {
                setLinkSelected({
                  dashboard: "selected",
                  events: "",
                  contacts: "",
                  deudas: "",
                  profile: "",
                });
              }}
            >
              Dashboard
            </Link>
            <Link
              href="/application/events"
              className={`${linkSelected.events}`}
              onClick={() => {
                setLinkSelected({
                  dashboard: "",
                  events: "selected",
                  contacts: "",
                  deudas: "",
                  profile: "",
                });
              }}
            >
              Eventos
            </Link>
            <Link
              href="/application/contacts"
              className={`${linkSelected.contacts}`}
              onClick={() => {
                setLinkSelected({
                  dashboard: "",
                  events: "",
                  contacts: "selected",
                  deudas: "",
                  profile: "",
                });
              }}
            >
              Contactos
            </Link>
            <Link
              href="/application/deudas"
              className={`${linkSelected.deudas}`}
              onClick={() => {
                setLinkSelected({
                  dashboard: "",
                  events: "",
                  contacts: "",
                  deudas: "selected",
                  profile: "",
                });
              }}
            >
              Deudas
            </Link>
            <Link
              href="/application/profile"
              className={`${linkSelected.profile}`}
              onClick={() => {
                setLinkSelected({
                  dashboard: "",
                  events: "",
                  contacts: "",
                  deudas: "",
                  profile: "selected",
                });
              }}
            >
              Perfil
            </Link>
          </div>
        </header>
      </div>
    </nav>
  );
};
