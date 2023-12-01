"use client";
import "./application.css";
import { Topbar } from "@/components/topbar/Topbar";
import { Header } from "@/components/header/Header";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import Loader from "@/components/loader/Loader";
import { profileGet } from "@/services/profile.fetch";
import { getUserGeneralBalances } from "@/services/balances";
import { generalBalances } from "@/services/generalServices";
import { formatNumber } from "@/services/generalServices";

export default function Application() {
  const [loadingPage, setLoadingPage] = useState(true);
  const [dataUser, setDataUser] = useState(null);
  const [dataBalances, setDataBalances] = useState(null);
  const [generalData, setGeneralData] = useState(null);
  const router = useRouter();

  useEffect(() => {
    if (getCookie("Token") == undefined) {
      router.push("/login");
    } else {
      async function userResponse() {
        const dataUserResponse = await profileGet();
        console.log("Usuario", dataUserResponse);
        setDataUser(dataUserResponse);
      }
      userResponse();
      async function userBalances() {
        const dataBalancesResponse = await getUserGeneralBalances();
        console.log("Balances", dataBalancesResponse);
        setDataBalances(dataBalancesResponse.data.saldo_eventos);
        const values = generalBalances(dataBalancesResponse.data.saldo_eventos);
        console.log(values);
        setGeneralData(values);
      }
      userBalances();
      setLoadingPage(false);
    }
  }, []);

  return loadingPage ? (
    <Loader />
  ) : (
    <div className="Application">
      <Topbar />
      <Header title={"Dashboard"} information={"Informacion general"} />
      {dataUser != null && dataBalances != null && generalData != null ? (
        <div className="container">
          <div className="welcome">
            <img src="/images/logo-blue.png" alt="" />
            <h1>
              Hola!!! <span>{dataUser.nombre.toUpperCase()}</span>
            </h1>
            <p>Nos alegra volver a verte 😃</p>
            <div className="info">
              <div className="card">
                <h2>Cuanto debo?</h2>
                <p>$ {formatNumber(generalData.prestamo)}</p>
              </div>
              <div className="card">
                <h2>Cuanto me deben?</h2>
                <p>$ {formatNumber(generalData.deuda)}</p>
              </div>
              <div className="card">
                <h2>Mi saldo</h2>
                <p>
                  ${" "}
                  {generalBalances.saldo >= 0
                    ? formatNumber(generalData.saldo)
                    : formatNumber(generalData.saldo * -1)}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
