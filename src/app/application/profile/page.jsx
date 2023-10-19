"use client";
import "./profile.css";
import { profileGet, profilePut } from "@/services/profile.fetch";
import { useEffect, useState } from "react";
import { ModalPassword } from "@/components/modalPassword/ModalPassword";
import { ModalConfirm } from "@/components/modalConfirm/Modalconfirm";

export default function Profile() {
  const [changeData, setChangeData] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  const [originalData, setOriginalData] = useState({
    nombre: "",
    apellidos: "",
    apodo: "",
  });
  const [data, setData] = useState({
    nombre: "",
    apellidos: "",
    apodo: "",
  });

  useEffect(() => {
    async function dataProfile() {
      const response = await profileGet();
      setData(response);
      setOriginalData(response);
    }
    dataProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      apodo: data.apodo,
      foto: "todavia no",
    };
    const put = await profilePut(newData);
    console.log(put);
    setOriginalData(data);
    setChangeData(false);
  };
  return (
    <div className="Profile">
      <div className="container">
        <div className="info">
          <div className="inputs">
            <h1>Bienvenido {originalData.nombre}</h1>
            <form onSubmit={handleSubmit}>
              <div className="text">
                <label>Nombres</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={`${changeData ? data.nombre : originalData.nombre}`}
                  disabled={!changeData}
                  onChange={(e) => {
                    setData({ ...data, nombre: e.target.value });
                  }}
                />
              </div>
              <div className="text">
                <label>Apellidos</label>
                <input
                  type="text"
                  id="lastname"
                  name="lastname"
                  value={`${
                    changeData ? data.apellidos : originalData.apellidos
                  }`}
                  disabled={!changeData}
                  onChange={(e) => {
                    setData({ ...data, apellidos: e.target.value });
                  }}
                />
              </div>
              <div className="text">
                <label>Apodo</label>
                <input
                  type="text"
                  id="nickname"
                  name="nickname"
                  value={`${changeData ? data.apodo : originalData.apodo}`}
                  disabled={!changeData}
                  onChange={(e) => {
                    setData({ ...data, apodo: e.target.value });
                  }}
                />
              </div>
              {changeData ? (
                <div className="changeData">
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
          <div className="more_options">
            <h3>Otras opciones</h3>
            <div className="buttons">
              <button onClick={() => {setModalPassword(true)}}>Cambiar contraseña</button>
              <button className="desactivate" onClick={() => {setModalDeleteUser(true)}}>Desactivar mi cuenta</button>
            </div>
          </div>
        </div>
        <div className="card"></div>
      </div>
      {modalPassword ? <ModalPassword /> : <></>}
      {modalDeleteUser ? <ModalConfirm /> : <></>}
    </div>
  );
}
