"use client";
import Image from "next/image";
import "./sidebar.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineHome } from "react-icons/ai";
import { BsCalendarEvent } from "react-icons/bs";
import { RiContactsBookLine } from "react-icons/ri";
import { BiMoneyWithdraw } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import Loader from "../loader/Loader";

export const Sidebar = () => {
  const [changePage, setChangePage] = useState(false);
  const [linkSelected, setLinkSelected] = useState({
    dashboard: "",
    events: "",
    contacts: "",
    deudas: "",
    profile: "",
  });

  // useEffect(() => {
  // }, [linkSelected]);

  return (
    <nav className="Sidebar">
      {changePage ? <Loader /> : null}
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
              title="Dashboard"
            >
              <AiOutlineHome size={"2em"} />
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
              title="Eventos"
            >
              <BsCalendarEvent size={"2em"} />
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
              title="Contactos"
            >
              <RiContactsBookLine size={"2em"} />
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
              title="Deudas"
            >
              <BiMoneyWithdraw size={"2em"} />
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
              title="Perfil"
            >
              <CgProfile size={"2em"} />
              Perfil
            </Link>
          </div>
        </header>
      </div>
    </nav>
  );
};
