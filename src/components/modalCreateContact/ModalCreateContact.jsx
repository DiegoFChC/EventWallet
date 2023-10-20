import "./modalCreateContact.css";
import { newContacts } from "@/services/contacts.post";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalCreateContact = ({ onCloseModal }) => {

  const notifyError = (message) => {
    toast.error(message, {
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
      email: e.target.email.value,
    };

    const response = await newContacts(data);
    console.log(response);
    if (!response.error) {
      onCloseModal(true);
    } else {
      notifyError(response.informacion);
    }
  }
  return (
    <div className="ModalCreateContact">
      <div className="container_modalC">
        <h1>Añadir nuevo contacto</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>Correo del nuevo contacto</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Correo electrónico"
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
            <button type="submit">Añadir contacto</button>
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
