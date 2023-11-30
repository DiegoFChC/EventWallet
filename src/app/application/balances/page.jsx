"use client";
import "./balances.css";
import { Header } from "@/components/header/Header";
import { Topbar } from "@/components/topbar/Topbar";
import { useEffect, useState, useContext } from "react";
import { getUserGeneralBalances, payAmount } from "@/services/balances";
import { AppContext } from "@/context/AppContext";
import { filterData } from "@/services/balances";
import BalancesCard from "@/components/balancesCard.jsx/BalancesCard";
import PaymentForm from "@/components/creditCard/CreditCard";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { formatNumber } from "@/services/generalServices";

export default function Balances() {
  const [inButton, setInButton] = useState({
    saldos: "buttonBalances",
    pago: "",
  });
  const [pay, setPay] = useState(false);
  const [dataBalances, setDataBalances] = useState(null);
  const [participantSelected, setParticipantSelected] = useState(null);
  const [dataEvent, setDataEvent] = useState(null);
  const [dataEventToPay, setDataEventToPay] = useState(null);
  const [valueToPay, setValueToPay] = useState(0);
  const [reload, setReload] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    async function getGeneralBalances() {
      const response = await getUserGeneralBalances();
      console.log(response);
      setDataBalances(response.data);
    }
    getGeneralBalances();
  }, [reload]);

  function handleSubmmit(e) {
    e.preventDefault();
    const event = e.target.event.value;
    const myEvent = filterData(
      dataBalances.saldo_eventos,
      "nombre_evento",
      event,
      dataBalances.usuario_id
    );
    console.log(myEvent);
    if (pay) {
      setDataEventToPay(myEvent);
      setParticipantSelected(myEvent.saldos[0]);
    } else {
      setDataEvent(myEvent);
    }
  }

  async function payValue() {
    const data = {
      evento: dataEventToPay.evento_id,
      prestador: participantSelected.usuario_id,
      valor: valueToPay,
    };
    const response = await payAmount(data);
    console.log(response);
    if (!response.error) {
      notify(response.informacion);
      setReload(!reload);
      setDataEventToPay(null);
      setValueToPay(0);
      setDataEvent(null)
    }
  }

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
    <div className="Balances">
      <Topbar />
      <Header title={"Deudas"} information={"Deudas y pagos"} />
      <div className="barNavigation">
        <button
          className={inButton.saldos}
          onClick={() => {
            setInButton({
              saldos: "buttonBalances",
              pago: "",
            });
            setPay(false);
          }}
        >
          Saldos generales
        </button>
        <button
          className={inButton.pago}
          onClick={() => {
            setInButton({
              saldos: "",
              pago: "buttonPay",
            });
            setPay(true);
          }}
        >
          Hacer un pago
        </button>
      </div>
      <div className="container">
        {dataBalances != null && dataBalances.saldo_eventos.length > 0 ? (
          <>
            <div className="selectEvent">
              <h1>Selecciona un evento</h1>
              <form onSubmit={handleSubmmit}>
                <label htmlFor="event">Eventos disponibles</label>
                <select
                  name="events"
                  id="event"
                  onChange={() => {
                    setDataEventToPay(null);
                    setValueToPay(0);
                    setDataEvent(null)
                  }}
                >
                  {dataBalances.saldo_eventos.map((item) => {
                    return (
                      <option
                        className="optionE"
                        key={item.evento_id}
                        value={item.nombre_evento}
                      >
                        {item.nombre_evento}
                      </option>
                    );
                  })}
                </select>
                <button type="submit">Buscar</button>
                {pay && dataEventToPay != null ? (
                  <>
                    <label htmlFor="participant">
                      Selecciona un participante
                    </label>
                    <select
                      name="participants"
                      id="participant"
                      onChange={(e) => {
                        const participant = dataEventToPay.saldos.filter(
                          (item) => item.nombre == e.target.value
                        );
                        setParticipantSelected(participant[0]);
                      }}
                    >
                      {dataEventToPay.saldos.map((item) => {
                        return (
                          <option
                            className="optionE"
                            key={item.nombre}
                            value={item.nombre}
                          >
                            {item.nombre}
                          </option>
                        );
                      })}
                    </select>
                    <p>
                      {participantSelected.saldo <= 0
                        ? `No le debes a este usuario`
                        : `Saldo: $ ${formatNumber(participantSelected.saldo)}`}
                    </p>
                    {participantSelected.saldo > 0 ? (
                      <input
                        type="number"
                        min={0}
                        max={participantSelected.saldo * -1}
                        onChange={(e) => setValueToPay(e.target.value)}
                      />
                    ) : null}
                  </>
                ) : null}
              </form>
            </div>
          </>
        ) : <h3 className="mensajeEvento">No estas asociado a ningún evento</h3>}
        {pay && valueToPay != 0 ? (
          <div className="generatePay">
            <h1>Pago</h1>
            <div className="creditCard">
              <PaymentForm />
            </div>
            <button onClick={payValue}>Enviar dinero</button>
          </div>
        ) : null}
        {pay == false && dataEvent != null ? (
          <div className="cardsBalances">
            <h1>{dataEvent.nombre_evento}</h1>
            <div className="balancesCards">
              {dataEvent.saldos.length > 0 ? (
                dataEvent.saldos.map((item) => {
                  return (
                    <BalancesCard
                      key={item.usuario_id}
                      nombre={item.nombre}
                      prestamo={item.prestamo}
                      deuda={item.deuda}
                      saldo={item.saldo}
                      debe={item.debe}
                      leDeben={item["le deben"]}
                      isPersonal={true}
                    />
                  );
                })
              ) : (
                <h3 className="mensajeDinero">Todavia no hay movimientos de dinero</h3>
              )}
            </div>
          </div>
        ) : null}
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
}
