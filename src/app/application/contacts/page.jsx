"use client";
import { useEffect, useState } from "react";
import "./contacts.css";
import { Header } from "@/components/header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ContactCard } from "@/components/contactCard/ContactCard";
import { getContacts } from "@/services/contacts";
import { newContacts } from "@/services/contacts.post";
import { ModalCreate } from "@/components/modalCreate/ModalCreate";
import { Topbar } from "@/components/topbar/Topbar";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";

const postData = [
  {
    label: "Email",
    type: "email",
    name: "email",
    id: "email",
    placeholder: "Correo electrónico",
  },
];

export default function Contacts() {
  const [createContact, setCreateContact] = useState(false);
  const [contacts, setContacts] = useState(null);
  const [reload, setReload] = useState(false);
  const router = useRouter();

  function closeModalDelete(notify) {
    setReload(!reload);
    if (notify) {
      notifySuccess("Contacto eliminado exitosamente");
    }
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

  const closeModal = (notify) => {
    setCreateContact(false);
    setReload(!reload);
    if (notify) {
      notifySuccess("Contacto añadido exitosamente");
    }
  };

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    }
    async function getData() {
      const data = await getContacts();
      setContacts(data.contacts);
    }

    getData();
  }, [reload,]);

  return (
    <div className="Contacts">
      <Topbar />
      <Header
        title={"CONTACTOS"}
        information={"Aquí puedes administrar tus contactos"}
      />
      <div className="container">
        <div className="cards">
          {contacts && contacts.length > 0
            ? contacts.map((item) => {
                if (item.is_active) {
                  return (
                    <ContactCard
                      key={item.usuario2.id}
                      name={item.usuario2.nombre}
                      lastname={item.usuario2.apellidos}
                      nickname={item.usuario2.apodo}
                      email={item.usuario2.email}
                      changeContact={closeModalDelete}
                    />
                  );
                }
              })
            : <h3>No Tienes Contactos</h3>}
        </div>
        <div
          className="createContact"
          onClick={() => {
            setCreateContact(true);
          }}
        ></div>
      </div>
      {createContact ? (
        <ModalCreate
          onCloseModal={closeModal}
          axios={newContacts}
          fields={postData}
          buttonName={"Añadir contacto"}
          title={"Añadir nuevo contacto"}
        />
      ) : null}
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
