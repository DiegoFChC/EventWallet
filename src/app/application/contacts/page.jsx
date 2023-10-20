"use client";
import { useState } from "react";
import "./contacts.css";
import { Header } from "@/components/header/Header";
import { ModalCreateContact } from "@/components/modalCreateContact/ModalCreateContact";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Contacts() {
  const [createContact, setCreateContact] = useState(false);
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

  const closeModal = (notify) => {
    setCreateContact(false);
    if (notify) {
      notifySuccess("Contacto añadido exitosamente");
    }
  };

  return (
    <div className="Contacts">
      <Header
        title={"CONTACTOS"}
        information={"Aquí puedes administrar tus contactos"}
      />
      <div className="container">
        <div className="cards"></div>
        <div
          className="createContact"
          onClick={() => {
            setCreateContact(true);
          }}
        ></div>
      </div>
      {createContact ? <ModalCreateContact onCloseModal={closeModal} /> : null}
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
