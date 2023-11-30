"use client";
import Image from "next/image";
import "./sidebar.css";
import Link from "next/link";
import { useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";
import { RiContactsBookLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";

export const Sidebar = () => {
  const [linkSelected, setLinkSelected] = useState({
    dashboard: "",
    events: "",
    contacts: "",
    deudas: "",
    profile: "",
  });

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
              <AiOutlineHome size={"2em"}/>
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
              <BsCalendarEvent size={"2em"}/>
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
              <RiContactsBookLine size={"2em"}/>
              Contactos
            </Link>
            <Link
              href="/application/balances"
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
              <BiMoneyWithdraw size={"2em"}/>
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
              <CgProfile size={"2em"}/>
              Perfil
            </Link>
          </div>
        </header>
      </div>
    </nav>
  );
};
