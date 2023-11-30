"use client";

import "./register.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerResponse } from "@/services/register.post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import Loader from "@/components/loader/Loader";
import AvatarModal from "@/components/avatarModal/AvatarModal";

export default function Register() {
  const [avatar, setAvatar] = useState("/images/avatar.jpg");
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [changePage, setChangePage] = useState(false);

  const handleSelectAvatar = (selectedAvatar) => {
    setAvatar(selectedAvatar);
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const router = useRouter();
  const notify = () => {
    toast.error("Ha ocurrido un error en tu solicitud", {
      position: "top-center",
      autoClose: 5000,
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

    let data = {
      nombre: e.target.name.value,
      apellidos: e.target.lastname.value,
      apodo: e.target.nickname.value,
      password: e.target.password.value,
      email: e.target.email.value,
      foto: avatar,
    };
    console.log(data);

    setLoadingRegister(true);
    const res = await registerResponse(data);
    console.log(res);

    if (
      res.nombre[0] != "This field may not be blank." &&
      res.apellidos[0] != "This field may not be blank." &&
      res.apodo[0] != "This field may not be blank." &&
      res.password[0] != "This field may not be blank." &&
      res.email[0] != "This field may not be blank." &&
      res.foto[0] != "This field may not be blank."
    ) {
      console.log(res);
      router.push("/login");
    } else {
      notify();
      setLoadingRegister(false);
    }
  }

  return (
    <main className="Register">
      {changePage ? <Loader /> : null}
      <div className="formRegister">
        <div className="container">
          <Image
            src="/images/logo-blue.png"
            alt="logo"
            width={100}
            height={60}
          />
          <h1>Registro</h1>
          <form onSubmit={handleSubmit}>
            <div className="avatar">
              <label htmlFor="file-input" onClick={handleOpenModal}>
                <img
                  // src={`${avatar != null ? avatar : "/images/avatar.jpg"}`}
                  src={avatar}
                  alt="avatar"
                />
              </label>
              <h4>Selecciona un avatar</h4>
              {/* <input
                id="file-input"
                name="avatar"
                type="file"
                placeholder="Avatar"
                accept="/image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file.type.substring(0, 5) === "image") {
                    setAvatar(URL.createObjectURL(file));
                  } else {
                    setAvatar(null);
                  }
                  // console.log(e.target.files[0])
                  // setAvatar(e.target.files[0]);
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
            <div className="inputs">
              <input name="name" type="text" placeholder="Nombre" required />
              <input
                name="lastname"
                type="text"
                placeholder="Apellido"
                required
              />
              <input name="nickname" type="text" placeholder="Apodo" required />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                required
              />
              <input
                name="password"
                type="password"
                placeholder="Contraseña"
                required
              />
            </div>
            <button type="submit" disabled={loadingRegister ? true : false}>
              {loadingRegister ? <Loader /> : null}
              REGISTRARME
            </button>
          </form>
        </div>
      </div>
      <div className="changeToLogin">
        <div className="info">
          <h2>Uno de nosotros</h2>
          <p>
            Bienvenido a nuestra comunidad, ahora eres un pilar importante en
            nuestra app.
          </p>
          <Link
            href="/login"
            onClick={() => {
              setChangePage(true);
            }}
          >
            INICIAR SESIÓN
          </Link>
        </div>
      </div>
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
    </main>
  );
}
