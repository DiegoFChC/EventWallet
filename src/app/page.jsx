import Link from "next/link";
export default function LandingPage() {
  return <div className="LandingPage">Landing Page
  <Link href={"/register"}>Registro</Link>
  <Link href={"/pruebas"}>Pruebas</Link>
  </div>;
}
