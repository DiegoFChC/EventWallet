"use client";
import Link from "next/link";
import Image from "next/image";
import "./login.css";
import { useRouter } from "next/navigation";
import { loginResponse } from "@/services/login.post";
import { setCookie } from "cookies-next";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "@/components/loader/Loader";
import { useState } from "react";

export default function Login() {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const router = useRouter();
  const notify = (message) => {
    toast.error(message, {
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
      username: e.target.email.value,
      password: e.target.password.value,
    };
    // console.log(data);
    setLoadingLogin(true)
    const res = await loginResponse(data);
    // console.log(res);
    if (!res.error) {
      setCookie("Token", "Token " + res.token);
      router.push("/application");
    } else {
      // console.log("datos incorrectos");
      notify("Credenciales incorrectas");
      setLoadingLogin(false)
    }
  }

  return (
    <main className="Login">
      <div className="changeToRegister">
        <div className="figure" />
        <div className="info">
          <h2>¿Nuevo aquí?</h2>
          <p>
            Te invitamos a ser parte y vivir una gran experiencia con toda
            nuestra gran comunidad.
          </p>
          <Link href="/register">CREAR CUENTA</Link>
        </div>
      </div>
      <div className="formLogin">
        <div className="container">
          <Image
            src="/images/logo-blue.png"
            alt="logo"
            width={100}
            height={60}
          />
          <h1>Iniciar sesión</h1>
          <form onSubmit={handleSubmit}>
            <input name="email" type="email" placeholder="Correo electrónico" />
            <input name="password" type="password" placeholder="Contraseña" />
            <button type="submit">
              {loadingLogin ? <Loader /> : null}
              INGRESAR
            </button>
          </form>
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
