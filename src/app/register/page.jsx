"use client";

import "./register.css";
import Link from "next/link";
import Image from "next/image";
import { postRequest } from "@/server/requests";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    let data = {
      nombre: e.target.name.value,
      apellidos: e.target.lastname.value,
      apodo: e.target.nickname.value,
      password: e.target.password.value,
      email: e.target.email.value,
      foto: "todavia no",
    };
    console.log(data);

    const res = await postRequest("http://127.0.0.1:8000/core/create", data);
    console.log(res);
    router.push("/login")
  }

  return (
    <main className="Register">
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
            <div className="inputs">
              <input name="name" type="text" placeholder="Nombre" />
              <input name="lastname" type="text" placeholder="Apellido" />
              <input name="nickname" type="text" placeholder="Apodo" />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
              />
              <input name="password" type="password" placeholder="Contraseña" />
            </div>
            <input name="avatar" type="file" placeholder="Avatar" />
            <button type="submit">REGISTRARME</button>
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
          <Link href="/login">INICIAR SESIÓN</Link>
        </div>
      </div>
    </main>
  );
}
