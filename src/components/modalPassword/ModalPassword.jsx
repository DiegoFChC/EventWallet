import { useState } from "react";
import "./modalpassword.css";
import { passwordPut } from "@/services/password.put";

export const ModalPassword = () => {
  const [deleteModal, setDeleteModal] = useState("ModalPassword");

  async function handleSubmit(e) {
    e.preventDefault();

    let data = {
      old_password: e.target.old_password.value,
      new_password: e.target.new_password.value,
    };

    const response = await passwordPut(data);

    console.log(response);
  }

  return (
    <div className={`${deleteModal}`}>
      <div className="container_modalP">
        <h1>Cambiar contraseña</h1>
        <form onSubmit={handleSubmit} className="inputs">
          <div className="inp">
            <label>Contraseña antigua</label>
            <input type="password" name="old_password" id="old_password" />
          </div>
          <div className="inp">
            <label>Nueva contraseña</label>
            <input type="password" name="new_password" id="new_password" />
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
              onClick={() => {
                setDeleteModal("delete");
              }}
            >
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
