import "./landingPage.css";
import Link from "next/link";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="LandingPage">
      <div className="container_LandingPage">
        <div className="image">
        <Image src="/images/logo-white.png" alt="logo" width={140} height={80}/>
        </div>
        <h1>
          Bienvenido a <span>Event Wallet</span>
        </h1>
        <h3>El mejor sitio para gestionar tus eventos</h3>
        <div className="buttons">
          <Link href={"/register"}>Registro</Link>
          <Link href={"/login"}>Login</Link>
        </div>
      </div>
    </div>
  );
}
