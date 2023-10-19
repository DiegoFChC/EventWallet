import Image from "next/image";
import "./sidebar.css";
import Link from "next/link";

export const Sidebar = () => {
  // const [isCollapsed, setIsCollapsed] = useState(false);

  // const toggleSidebar = () => {
  //   setIsCollapsed(!isCollapsed);
  // };

  return (
    <nav className="Sidebar">
      <header>
        <div className="image-text">
          <Image
            src="/images/logo-blue.png"
            alt="logo"
            width={65}
            height={35}
          />
          <div className="text header-text">
            <span className="title">Event Wallet</span>
          </div>
        </div>
        {/* <Link href="/application/eventos">Eventos</Link>
      <Link href="/application/contactos">Contactos</Link>
      <Link href="/application/deudas">Deudas</Link>
      <Link href="/application/profile">Perfil</Link> */}
      </header>
    </nav>
  );
};
