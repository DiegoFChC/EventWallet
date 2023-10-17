"use client";

import "./register.css";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { registerResponse } from "@/services/register.post";

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

    const res = await registerResponse(data);
    console.log(res);
    router.push("/login");
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
              <input name="name" type="text" placeholder="Nombre" required />
              <input name="lastname" type="text" placeholder="Apellido" required />
              <input name="nickname" type="text" placeholder="Apodo" required />
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                required
              />
              <input name="password" type="password" placeholder="Contraseña" required />
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
