"use client";
import "./activity.css";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import { getActivity, modifyActivity } from "@/services/activities";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Activity({ params }) {
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  // Controladores de los datos de la actividad
  const [data, setData] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [changeData, setChangeData] = useState(false);
  const [reload, setReload] = useState(false);

  // console.log(params);
  useEffect(() => {
    async function thisActivity() {
      const data = await getActivity(params.id_event);
      const myActivity = data.data.filter(
        (item) => item.id == params.id_activity
      );
      setActivity(myActivity[0]);
      setData(myActivity[0]);
      setOriginalData(myActivity[0]);
      setLoading(false);
    }

    thisActivity();
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
    console.log(newData);
    const response = await modifyActivity(newData);
    console.log(response);
    setChangeData(false);
    notify("Datos actualizados con éxito");
    setReload(!reload);
  }

  return (
    <div className="Activity">
      <Topbar />
      <Header
        title={"Actividad"}
        information={"Gestiona la información de tus actividades"}
      />
      {loading ? (
        <>loading</>
      ) : (
        <div className="container">
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
                type="number"
                id="valor"
                value={`${changeData ? data.valor : originalData.valor}`}
                disabled
                onChange={(e) => {
                  setData({ ...data, valor: e.target.value });
                }}
                className={`${changeData ? "changeData" : ""}`}
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
        </div>
      )}
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
