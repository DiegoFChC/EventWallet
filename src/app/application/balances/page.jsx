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
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";

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
  const [loadingPage, setLoadingPage] = useState(true);
  const [pagoApp, setPagoApp] = useState(false);
  const [pagoManoAMano, setPagoManoAMano] = useState(false);
  const [autopago, setAutopago] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    } else {
      async function getGeneralBalances() {
        const response = await getUserGeneralBalances();
        setDataBalances(response.data);
        setLoadingPage(false);
      }
      getGeneralBalances();
    }
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
    if (pay) {
      setDataEventToPay(myEvent);
      setParticipantSelected(myEvent.saldos[0]);
    } else {
      setDataEvent(myEvent);
    }
  }

  async function payValue(e) {
    e.preventDefault();
    let data = {};
    if (autopago) {
      data = {
        evento: dataEventToPay.evento_id,
        deudor: participantSelected.usuario_id,
        prestador: dataBalances.usuario_id,
        valor: valueToPay,
      };
    } else if (pagoApp || pagoManoAMano) {
      data = {
        evento: dataEventToPay.evento_id,
        deudor: dataBalances.usuario_id,
        prestador: participantSelected.usuario_id,
        valor: valueToPay,
      };
    }
    const response = await payAmount(data);
    if (!response.error) {
      notify(response.informacion);
      setReload(!reload);
      setDataEventToPay(null);
      setValueToPay(0);
      setDataEvent(null);
      setAutopago(false);
      setPagoApp(false);
      setPagoManoAMano(false);
      setParticipantSelected(null);
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

  return loadingPage ? (
    <Loader />
  ) : (
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
                    setDataEvent(null);
                    setPagoApp(false);
                    setPagoManoAMano(false);
                    setAutopago(false);
                    setParticipantSelected(null);
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
                        setPagoApp(false);
                        setPagoManoAMano(false);
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
                      {participantSelected.saldo < 0
                        ? `Este usuario te debe un saldo de: $${formatNumber(
                            participantSelected.saldo * -1
                          )}`
                        : participantSelected.saldo > 0
                        ? `Le debes a este usuario un saldo de: $${formatNumber(
                            participantSelected.saldo
                          )}`
                        : `Tu saldo con este usuario es neutro`}
                    </p>
                  </>
                ) : null}
              </form>
              {pay &&
              participantSelected != null &&
              participantSelected.saldo > 0 ? (
                <div className="pago">
                  A continuación podrás registrar un pago
                  <input
                    type="number"
                    placeholder="Monto"
                    min={0}
                    max={participantSelected.saldo}
                    onChange={(e) => setValueToPay(e.target.value)}
                  />
                  <div className="optionsButtons">
                    {valueToPay != 0 ? (
                      <>
                        <button
                          onClick={() => {
                            setPagoApp(true);
                            setPagoManoAMano(false);
                            setAutopago(false);
                          }}
                        >
                          Hacer pago desde app
                        </button>
                        <form onSubmit={payValue}>
                          <button
                            type="submit"
                            onClick={() => {
                              setPagoManoAMano(true);
                              setPagoApp(false);
                              setAutopago(false);
                            }}
                          >
                            Registrar pago mano a mano
                          </button>
                        </form>
                      </>
                    ) : null}
                  </div>
                </div>
              ) : pay &&
                participantSelected != null &&
                participantSelected.saldo < 0 ? (
                <div className="pago">
                  A continuación podrás registrar un pago que ya te han hecho
                  <input
                    type="number"
                    placeholder="Monto"
                    min={0}
                    max={participantSelected.saldo}
                    onChange={(e) => setValueToPay(e.target.value)}
                  />
                  <div className="optionsButtons">
                    {valueToPay != 0 ? (
                      <form onSubmit={payValue}>
                        <button
                          type="submit"
                          onClick={() => {
                            setAutopago(true);
                          }}
                        >
                          Registrar pago
                        </button>
                      </form>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <h3 className="mensajeEvento">No estas asociado a ningún evento</h3>
        )}
        {pay && pagoApp && valueToPay != 0 ? (
          <div className="generatePay">
            <h1>Pago</h1>
            <div className="creditCard">
              <PaymentForm />
            </div>
            <button onClick={payValue}>Hacer pago</button>
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
                <h3 className="mensajeDinero">
                  Todavia no hay movimientos de dinero
                </h3>
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
