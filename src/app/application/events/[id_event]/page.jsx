"use client";
import "./manage.css";
import { useAppContext } from "@/context/AppContext";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import { changeDataEvents } from "@/services/events";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getEvents, processData, inviteContact } from "@/services/events";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ModalCreate } from "@/components/modalCreate/ModalCreate";

const postData = [
  {
    label: "Email",
    type: "email",
    name: "email",
    id: "email",
    placeholder: "Correo electrónico",
  },
];

export default function Manage({ params }) {
  const { appState, setAppState } = useAppContext();
  const [imageEvent, setImageEvent] = useState("/images/avatar.jpg");
  const [originalData, setOriginalData] = useState(null);
  const [data, setData] = useState(null);
  const [changeData, setChangeData] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const [addContact, setAddContact] = useState(false);

  const closeModal = (notification) => {
    setAddContact(false);
    setReload(!reload);
    if (notification) {
      notify("El contacto ha sido invitado");
    }
  };

  useEffect(() => {
    async function myEvents() {
      const response = await getEvents();
      const event = processData(response, params.id_event);
      setOriginalData(event);
      setData(event);
      setLoading(false);
    }
    myEvents();
  }, [reload]);

  const notify = (message) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      evento_id: data.id,
      nombre: data.nombre,
      descripcion: data.descripcion,
      tipo: data.tipo,
      foto: imageEvent,
    };
    const dataPut = await changeDataEvents(newData);
    setChangeData(false);
    notify("Datos actualizados con éxito");
    setReload(!reload);
  };

  return (
    <div className="Manage">
      <Topbar />
      <Header
        title={"EVENTOS"}
        information={"Gestiona la información de tus eventos"}
      />
      <div className="container">
        {loading ? (
          <></>
        ) : (
          <div className="info_event">
            <form className="data" onSubmit={handleSubmit}>
              <input
                type="text"
                id="title"
                value={`${changeData ? data.nombre : originalData.nombre}`}
                disabled={!changeData}
                onChange={(e) => {
                  setData({ ...data, nombre: e.target.value });
                }}
                className={`${changeData ? "changeData" : ""}`}
              />
              <textarea
                name="description"
                id="description"
                value={`${
                  changeData ? data.descripcion : originalData.descripcion
                }`}
                disabled={!changeData}
                onChange={(e) => {
                  setData({ ...data, descripcion: e.target.value });
                }}
                className={`${changeData ? "changeData" : ""}`}
              ></textarea>
              <p>{originalData.tipo}</p>
              {changeData ? (
                <div className="changeData_buttons">
                  <button
                    className="cancel"
                    onClick={() => {
                      setChangeData(false);
                      setData(originalData);
                    }}
                  >
                    Cancelar
                  </button>
                  <button type="submit">Guardar cambios</button>
                </div>
              ) : originalData.creator == "me" ? (
                <button
                  onClick={() => {
                    setChangeData(true);
                  }}
                >
                  Editar datos
                </button>
              ) : null}
            </form>
            <div className="image">
              <label htmlFor="file-input">
                <img
                  // src={`${avatar != null ? avatar : "/images/avatar.jpg"}`}
                  src={imageEvent}
                  alt="avatar"
                />
              </label>
              {changeData ? <h4>Cambiar avatar</h4> : null}
              <input
                id="file-input"
                name="avatar"
                type="file"
                placeholder="Avatar"
                accept="/image/*"
                disabled={!changeData}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file.type.substring(0, 5) === "image") {
                    setImageEvent(URL.createObjectURL(file));
                  } else {
                    setImageEvent(null);
                  }
                }}
                required
              />
            </div>
          </div>
        )}
        <div className="cards_events"></div>
        <div className="createActivity"></div>
        <button className="button-add"
          onClick={() => {
            setAddContact(true);
          }}
        >
          <AiOutlineUserAdd />
        </button>
      </div>
      {addContact ? (
        <ModalCreate
          onCloseModal={closeModal}
          axios={inviteContact}
          fields={postData}
          buttonName={"Añadir contacto"}
          title={"Añadir un contacto a este evento"}
          additionalFields={{evento_id: params.id_event}}
        />
      ) : null}
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
