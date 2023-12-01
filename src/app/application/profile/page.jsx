"use client";
import "./profile.css";
import { profileGet, profilePut } from "@/services/profile.fetch";
import { useEffect, useState } from "react";
import { ModalPassword } from "@/components/modalPassword/ModalPassword";
import { ModalConfirm } from "@/components/modalConfirm/Modalconfirm";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "@/components/header/Header";
import { deleteUserPut } from "@/services/deleteUser.put";
import { Topbar } from "@/components/topbar/Topbar";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import AvatarModal from "@/components/avatarModal/AvatarModal";
import Loader from "@/components/loader/Loader";

export default function Profile() {
  const [changeData, setChangeData] = useState(false);
  const [modalPassword, setModalPassword] = useState(false);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [originalData, setOriginalData] = useState({
    nombre: "",
    apellidos: "",
    apodo: "",
    foto: "",
  });
  const [data, setData] = useState({
    nombre: "",
    apellidos: "",
    apodo: "",
    foto: "",
  });
  const router = useRouter();

  const handleSelectAvatar = (selectedAvatar) => {
    setIsModalOpen(false);
    setData({ ...data, foto: selectedAvatar });
  };

  const handleOpenModal = () => {
    if (changeData) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const closeModalPassword = (notify) => {
    setModalPassword(false);
    setModalDeleteUser(false);
  };
  // console.log("mi modal", modalPassword);

  const notify = () => {
    toast.success("Tus datos han sido actualizados con éxito", {
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

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    } else {
      async function dataProfile() {
        const response = await profileGet();
        setData(response);
        setOriginalData(response);
        setLoadingPage(false);
      }
      dataProfile();
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newData = {
      nombre: data.nombre,
      apellidos: data.apellidos,
      apodo: data.apodo,
      foto: data.foto,
    };
    const put = await profilePut(newData);
    console.log(put);
    setOriginalData(data);
    setChangeData(false);
    notify();
  };
  return loadingPage ? (
    <Loader />
  ) : (
    <div className="Profile">
      <Topbar />
      <Header title={"PERFIL"} information={"Información de mi cuenta"} />
      <div className="container">
        <div className="info">
          <div className="inputs">
            <h1>Información de tu cuenta</h1>
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
              <button
                onClick={() => {
                  setModalPassword(true);
                }}
              >
                Cambiar contraseña
              </button>
              <button
                className="desactivate"
                onClick={() => {
                  setModalDeleteUser(true);
                }}
              >
                Desactivar mi cuenta
              </button>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="avatar">
            <label htmlFor="file-input" onClick={handleOpenModal}>
              <img
                // src={`${avatar != null ? avatar : "/images/avatar.jpg"}`}
                src={`${changeData ? data.foto : originalData.foto}`}
                alt="avatar"
              />
            </label>
            {changeData ? <h4>Cambiar avatar</h4> : null}
            {/* <input
              id="file-input"
              name="avatar"
              type="file"
              placeholder="Avatar"
              accept="/image/*"
              disabled={!changeData}
              onChange={(e) => {
                const file = e.target.files[0];
                if (file.type.substring(0, 5) === "image") {
                  setAvatar(URL.createObjectURL(file));
                } else {
                  setAvatar(null);
                }
              }}
              required
            /> */}
          </div>
          {isModalOpen && (
            <AvatarModal
              onSelectAvatar={handleSelectAvatar}
              onClose={handleCloseModal}
              type={"avatars"}
            />
          )}
          <h2>{originalData.nombre + " " + originalData.apellidos}</h2>
          <h3>{originalData.apodo}</h3>
        </div>
      </div>
      {modalPassword ? (
        <ModalPassword onCloseModal={closeModalPassword} />
      ) : null}
      {modalDeleteUser ? (
        <ModalConfirm
          title={"¿Estas seguro de que quieres eliminar tu cuenta?"}
          labelName={"Contraseña"}
          action={"Eliminar cuenta"}
          idInput={"password"}
          axios={deleteUserPut}
          onCloseModal={closeModalPassword}
        />
      ) : (
        <></>
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
