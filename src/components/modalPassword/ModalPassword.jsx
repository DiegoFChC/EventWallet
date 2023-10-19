import { useState } from "react";
import "./modalpassword.css";
import { passwordPut } from "@/services/password.put";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalPassword = ({ onCloseModal }) => {
  const [deleteModal, setDeleteModal] = useState("ModalPassword");

  const notify = (message) => {
    toast.success(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  async function handleSubmit(e) {
    e.preventDefault();

    let data = {
      old_password: e.target.old_password.value,
      new_password: e.target.new_password.value,
    };

    const response = await passwordPut(data);

    console.log(response);
    if (!response.error) {
      notify(response.informacion);
      onCloseModal();
    } else {
      onCloseModal();
    }
  }

  return (
    <div className={`${deleteModal}`}>
      <div className="container_modalP">
        <h1>Cambiar contraseña</h1>
        <form onSubmit={handleSubmit} className="inputs">
          <div className="inp">
            <label>Contraseña antigua</label>
            <input
              type="password"
              name="old_password"
              id="old_password"
              required
            />
          </div>
          <div className="inp">
            <label>Nueva contraseña</label>
            <input
              type="password"
              name="new_password"
              id="new_password"
              required
            />
          </div>
          <div className="buttons">
            <label
              className="cancel"
              onClick={() => {
                onCloseModal();
              }}
            >
              Cancelar
            </label>
            <button
              type="submit"
            >
              Cambiar contraseña
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
};
