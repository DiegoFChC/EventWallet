import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./modalCreate.css";

export const ModalCreate = ({
  onCloseModal,
  axios,
  title,
  fields,
  buttonName,
  additionalFields,
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

    let data = {};
    if (fields != null) {
      fields.forEach((field) => {
        data[field.name] = e.target[field.name].value;
      });
    }

    if (additionalFields != null) {
      data = Object.assign(data, additionalFields);
    }
    console.log(data);

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
          { fields != null ? fields.map((field) => (
            <div className="inputs" key={field.name}>
              <label>{field.label}</label>
              {field.type === "select" ? (
                <select
                  name={field.name}
                  id={field.id}
                  required
                  className="type"
                >
                  <option value="" disabled hidden>
                    {field.placeholder}
                  </option>
                  {field.options.map((option, index) => (
                    <option key={index} value={option.value} className="type">
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  id={field.id}
                  placeholder={field.placeholder}
                  maxLength={field.maxlength}
                  required
                />
              )}
            </div>
          )):null}
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
