import { useState } from "react";
import "./modalconfirm.css";
import { useRouter } from "next/navigation";
import { deleteUserPut } from "@/services/deleteUser.put";

export const ModalConfirm = () => {
  const [deleteModal, setDeleteModal] = useState("ModalConfirm");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();

    let data = {
      password: e.target.password.value
    };

    const response = await deleteUserPut(data);

    console.log(response);
    router.push("/");
  }

  return (
    <div className={`${deleteModal}`}>
      <div className="container_modalC">
        <h1>¿Estas seguro de que quieres eliminar tu cuenta?</h1>
        <form onSubmit={handleSubmit} className="inputs">
          <div className="inp">
            <label>Contraseña</label>
            <input type="password" name="password" id="password" required/>
          </div>
        <div className="buttons">
          <button
            className="cancel"
            onClick={() => {
              setDeleteModal("delete");
            }}
          >
            Cancelar
          </button>
          <button
            type="submit"
            // onClick={() => {
            //   setDeleteModal("delete");
            // }}
          >
            Eliminar cuenta
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};
