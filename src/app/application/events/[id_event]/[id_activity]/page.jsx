"use client";
import "./activity.css";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import { getActivity, modifyActivity } from "@/services/activities";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineUserAdd } from "react-icons/ai";
import "react-toastify/dist/ReactToastify.css";
import AddContactActivity from "@/components/addContactActivity/AddContactActivity";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { formatNumber } from "@/services/generalServices";
import Loader from "@/components/loader/Loader";
import { getActivityParticipants } from "@/services/activities";
import { BsTrash } from "react-icons/bs";
import { deleteActivity } from "@/services/activities";
import { ModalCreate } from "@/components/modalCreate/ModalCreate";

export default function Activity({ params }) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  // Controladores de los datos de la actividad
  const [data, setData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [changeData, setChangeData] = useState(false);
  const [reload, setReload] = useState(false);
  const [addContact, setAddContact] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [participantsActivity, setParticipantsActivity] = useState(null);
  const [constDeleteActivity, setDeleteActivity] = useState(false);
  const router = useRouter();

  const closeModal = (notification) => {
    setAddContact(false);
    setReload(!reload);
    if (notification) {
      notify("Tu petición ha terminado exitosamente");
    }
  };

  const closeModal2 = () => {
    router.push(`/application/events/${params.id_event}`);
    setDeleteActivity(false);
  };

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    } else {
      async function thisActivity() {
        const data = await getActivity(params.id_event);
        const myActivity = data.data.filter(
          (item) => item.id == params.id_activity
        );
        setActivity(myActivity[0]);
        setData(myActivity[0]);
        setOriginalData(myActivity[0]);
      }
      thisActivity();
      async function getParticipantsActivity() {
        const response = await getActivityParticipants(params.id_event);
        const activity = response.data.filter(
          (item) => item.actividad == params.id_activity
        );
        setParticipantsActivity(activity[0]);
        setLoading(false);
        setLoadingPage(false);
      }
      getParticipantsActivity();
    }
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

  async function handleSubmit(e) {
    e.preventDefault();
    const newData = {
      actividad_id: params.id_activity,
      nombre: data.nombre,
      descripcion: data.descripcion,
    };
    // console.log(newData);
    const response = await modifyActivity(newData);
    // console.log(response);
    setChangeData(false);
    notify("Datos actualizados con éxito");
    setReload(!reload);
  }

  return loadingPage ? (
    <Loader />
  ) : (
    <div className="Activity">
      <Topbar />
      <Header
        title={"Actividad"}
        information={"Gestiona la información de tus actividades"}
        back={`/application/events/${params.id_event}`}
      />
      {loading ? (
        <>loading</>
      ) : (
        <div className="container">
          <div className="activityInfo">
            <form onSubmit={handleSubmit} className="info_activity">
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
              <div className="value_activity">
                <h1>$ </h1>
                <input
                  type="text"
                  id="valor"
                  value={formatNumber(originalData.valor)}
                  disabled
                />
              </div>
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
              ) : (
                <button
                  onClick={() => {
                    setChangeData(true);
                  }}
                >
                  Editar datos
                </button>
              )}
            </form>
            {participantsActivity.participantes != [] &&
            participantsActivity.participantes.length <= 1 ? (
              <button
                className="deleteActivity"
                onClick={() => {
                  setDeleteActivity(true);
                }}
              >
                <BsTrash />
              </button>
            ) : null}
          </div>
          <div className="participantes">
            <h1>Participantes de esta actividad</h1>
            {participantsActivity.participantes.length != 0
              ? participantsActivity.participantes.map((item) => {
                  return (
                    <p key={item.participante.id}>
                      {item.participante.nombre +
                        " " +
                        item.participante.apellidos}
                    </p>
                  );
                })
              : "No hay participantes aún"}
          </div>
          {participantsActivity.participantes.length == 0 ? (
            <button
              className="button-add"
              onClick={() => {
                setAddContact(true);
              }}
            >
              <AiOutlineUserAdd />
            </button>
          ) : null}
        </div>
      )}
      {addContact ? (
        <AddContactActivity
          idEvent={params.id_event}
          idActivity={params.id_activity}
          valueActivity={originalData.valor}
          changePage={closeModal}
        />
      ) : null}
      {constDeleteActivity ? (
        <ModalCreate
          onCloseModal={closeModal2}
          axios={deleteActivity}
          buttonName={"Eliminar Actividad"}
          title={"¿Estas seguro de que deseas eliminar esta actividad?"}
          additionalFields={{ actividad_id: params.id_activity }}
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
