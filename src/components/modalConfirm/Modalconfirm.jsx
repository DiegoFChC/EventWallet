import { useState } from "react";
import "./modalconfirm.css";
import { useRouter } from "next/navigation";
import { deleteUserPut } from "@/services/deleteUser.put";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalConfirm = ({ onCloseModal }) => {
  const [deleteModal, setDeleteModal] = useState("ModalConfirm");
  const router = useRouter();

  const notify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 5000,
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
      password: e.target.password.value,
    };

    const response = await deleteUserPut(data);

    console.log(response);
    if (!response.error) {
      router.push("/");
    } else {
      notify(response.informacion);
    }
  }

  return (
    <div className={`${deleteModal}`}>
      <div className="container_modalC">
        <h1>¿Estas seguro de que quieres eliminar tu cuenta?</h1>
        <form onSubmit={handleSubmit} className="inputs">
          <div className="inp">
            <label>Contraseña</label>
            <input type="password" name="password" id="password" required />
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
              // onClick={() => {
              //   setDeleteModal("delete");
              // }}
            >
              Eliminar cuenta
            </button>
          </div>
        </form>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={5000}
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
