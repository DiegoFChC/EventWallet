import "./balancesCard.css";
import { formatNumber } from "@/services/generalServices";

export default function BalancesCard({
  nombre,
  prestamo,
  deuda,
  saldo,
  debe,
  leDeben,
  isPersonal,
}) {
  // console.log(nombre, prestamo, deuda, saldo, debe, leDeben);
  function colorCard(valorSaldo) {
    let color = "blue";
    if (valorSaldo > 0) {
      color = "red";
    } else if (valorSaldo < 0) {
      color = "green";
    }
    return color;
  }

  return (
    <div className="BalancesCard">
      <div className={`container ${colorCard(saldo)}`}>
        <div className="info">
          <div className="data">
            <h1>{nombre}</h1>
            <h3>
              {isPersonal ? "Me ha prestado" : "Le ha prestado"}: ${" "}
              <span>
                {prestamo < 0
                  ? formatNumber(prestamo * -1)
                  : formatNumber(prestamo)}
              </span>
            </h3>
            <h3>
              {isPersonal ? "Me debe" : "Le debe"}: ${" "}
              <span>
                {deuda < 0 ? formatNumber(deuda * -1) : formatNumber(deuda)}
              </span>
            </h3>
          </div>
          <div className="saldo">
            <p>Saldo</p>
            <h1>
              {saldo < 0 ? formatNumber(saldo * -1) : formatNumber(saldo)}
            </h1>
          </div>
        </div>
        {saldo > 0 ? <p className="redP">Saldo en contra</p> : null}
        {saldo < 0 ? <p className="greenP">Saldo a favor</p> : null}
        {saldo == 0 ? <p className="blueP">Saldo neutro</p> : null}
      </div>
    </div>
  );
}
