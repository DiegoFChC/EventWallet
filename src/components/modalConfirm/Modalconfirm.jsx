import { useState } from "react";
import "./modalconfirm.css";
import { useRouter } from "next/navigation";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalConfirm = ({
  title,
  labelName,
  idInput,
  action,
  defaulValue,
  onCloseModal,
  axios,
}) => {
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
      // idInput: e.target.password.value,
    };

    data[idInput] = e.target[idInput].value;

    const response = await axios(data);

    console.log(response);
    if (!response.error) {
      if(response.informacion === "El contacto ha sido eliminado") {
        onCloseModal(true)
      } else {
        router.push("/");
      }
    } else {
      notify(response.informacion);
    }
  }

  return (
    <div className={`${deleteModal}`}>
      <div className="container_modalC">
        <h1>{title}</h1>
        <form onSubmit={handleSubmit} className="inputs">
          <div className="inp">
            <label>{labelName}</label>
            <input
              type={idInput}
              name={idInput}
              id={idInput}
              defaultValue={defaulValue}
              required
            />
          </div>
          <div className="buttons">
            <label
              className="cancel"
              onClick={() => {
                onCloseModal(false);
              }}
            >
              Cancelar
            </label>
            <button
              type="submit"
              // }}
            >
              {action}
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
