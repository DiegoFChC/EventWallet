import "./contactCard.css";
import { useState } from "react";
import Image from "next/image";
import { ModalConfirm } from "@/components/modalConfirm/Modalconfirm";
import { deleteContacts } from "@/services/contacts.post";

export const ContactCard = ({
  name,
  lastname,
  nickname,
  email,
  changeContact,
  foto,
}) => {
  const [deleteContact, setDeleteContact] = useState(false);

  function closeModal(notify) {
    changeContact(notify);
    setDeleteContact(false);
  }

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
          <Image src={foto} alt="logo" width={80} height={80} />
        </div>
      </div>
      <button
        onClick={() => {
          setDeleteContact(true);
        }}
      >
        Eliminar contacto
      </button>
      {deleteContact ? (
        <ModalConfirm
          title={"¿Estas seguro de que quieres eliminar a este contacto?"}
          labelName={"Correo electronico"}
          action={"Eliminar contacto"}
          idInput={"email"}
          defaulValue={email}
          onCloseModal={closeModal}
          axios={deleteContacts}
        />
      ) : null}
    </div>
  );
};
