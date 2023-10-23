import "./contactCard.css";
import Image from "next/image";

export const ContactCard = ({ name, lastname, nickname, email }) => {
  return (
    <div className="ContactCard">
      <div className="container_info">
        <div className="info">
          <h1>{name}</h1>
          <h1>{lastname}</h1>
          <p>
            Apodo: <span>{nickname}</span>
          </p>
          <p>{email}</p>
        </div>
        <div className="img">
          <Image src="/images/avatar.jpg" alt="logo" width={80} height={80} />
        </div>
      </div>
      <button>Eliminar contacto</button>
    </div>
  );
};
