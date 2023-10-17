import Image from "next/image";
import "./sidebar.css"

export const Sidebar = () => {

  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="toggle-button" onClick={toggleSidebar}>
        <i className={`fas ${isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'}`}></i>
      </div>
      <Image src="/images/logo-blue.png" alt="logo" width={65} height={35} />
      <ul>
        <li>
          <Link href="/pagina1">
            <a>Ir a Página 1</a>
          </Link>
        </li>
        {/* Agrega más enlaces según sea necesario */}
      </ul>
    </div>
  );
};


