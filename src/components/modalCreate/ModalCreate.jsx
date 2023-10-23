import "./modalCreate.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ModalCreate = ({
  onCloseModal,
  axios,
  title,
  description,
  placeholder,
  buttonName,
  typeButton
}) => {
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

    const response = await axios(data);
    console.log(response);
    if (!response.error) {
      onCloseModal(true);
    } else {
      notifyError(response.informacion);
    }
  }
  return (
    <div className="ModalCreate">
      <div className="container_modalC">
        <h1>{title}</h1>
        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <label>{description}</label>
            <input
              type={typeButton}
              name="email"
              id="email"
              placeholder={placeholder}
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
            <button type="submit">{buttonName}</button>
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
