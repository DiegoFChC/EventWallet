"use client";
import "./balancesUser.css";
import { useEffect, useState } from "react";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { getUserBalances, clearData } from "@/services/balances";
import BalancesCard from "@/components/balancesCard.jsx/BalancesCard";

export default function BalancesUser({ params, searchParams }) {
  const [loading, setLoading] = useState(true);
  const [balances, setBalances] = useState(null);

  useEffect(() => {
    async function balancesUser() {
      const response = await getUserBalances(
        params.id_event,
        searchParams.user
      );
      const data = clearData(response, searchParams.user);
      setBalances(data);
      setLoading(false);
    }
    balancesUser();
  }, []);

  return (
    <div className="Balances">
      <Topbar />
      <Header
        title={"SALDOS"}
        information={"Saldo de un usuario hacia todos los integrantes"}
        back={`/application/events/${params.id_event}`}
      />
      <div className="container">
        {loading ? (
          <></>
        ) : (
          <>
            {/* <div className="cards"> */}
            <div className="title">
              <h1>
                A continuación verás los saldos de{" "}
                <span>{balances.data.nombre}</span>
              </h1>
            </div>
            <div className="content">
              {balances.data.saldos.length > 0 ? (
                balances.data.saldos.map((item) => {
                  return (
                    <BalancesCard
                      key={item.usuario_id}
                      nombre={item.nombre}
                      prestamo={item.prestamo}
                      deuda={item.deuda}
                      saldo={item.saldo}
                      debe={item.debe}
                      leDeben={item["le deben"]}
                      isPersonal={false}
                    />
                  );
                })
              ) : (
                <p>El usuario no tiene balances</p>
              )}
            </div>
            {/* </div> */}
          </>
        )}
      </div>
    </div>
  );
}
