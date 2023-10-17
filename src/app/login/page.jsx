"use client";
import Link from "next/link";
import Image from "next/image";
import "./login.css";
import { useRouter } from "next/navigation";
import { loginResponse } from "@/services/login.post";
import { setCookie } from 'cookies-next';

export default function Login() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    let data = {
      username: e.target.email.value,
      password: e.target.password.value,
    };
    console.log(data);
    const res = await loginResponse(data);
    console.log(res);
    setCookie("Token", "Token " + res.token)
    router.push("/application");
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
            <button type="submit">INGRESAR</button>
          </form>
        </div>
      </div>
    </main>
  );
}
