import "./activityCard.css";
import { useState } from "react";
import { useAppContext } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { BsTrash } from "react-icons/bs";
import { deleteActivity } from "@/services/activities";
import { ToastContainer, toast } from "react-toastify";
import { ModalCreate } from "../modalCreate/ModalCreate";

const postData = [
  {
    label: "text",
    type: "text",
    name: "text",
    id: "text",
    placeholder: "Eliminar Actividad",
  },
];

export const ActivityCard = ({ idEvent, id, name, value, funcion }) => {
  const { appState, setAppState } = useAppContext();
  const router = useRouter();
  const [constDeleteActivity, setDeleteActivity] = useState(false);

  const closeModal = () => {
    setDeleteActivity(false);
    funcion(true);
  };

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

  return (
    <div className="ActivityCard">
      <div className="container_info">
        <h1>{name}</h1>
        <p>Valor</p>
        <h2>
          $ <span>{value}</span>
        </h2>
      </div>
      <div className="container_button">
        <button
          onClick={() => {
            router.push(`/application/events/${idEvent}/${id}`);
          }}
        >
          Ver Más
        </button>
      </div>
      <button
        className="delete"
        onClick={() => {
          setDeleteActivity(true);
        }}
      >
        <BsTrash></BsTrash>
      </button>
      {constDeleteActivity ? (
        <ModalCreate
          onCloseModal={closeModal}
          axios={deleteActivity}
          buttonName={"Eliminar Actividad"}
          title={"¿Estas seguro de que deseas eliminar esta actividad?"}
          additionalFields={{ actividad_id: id }}
        />
      ) : null}
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
