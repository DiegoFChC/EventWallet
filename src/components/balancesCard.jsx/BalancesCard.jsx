import "./balancesCard.css";

export default function BalancesCard({
  nombre,
  prestamo,
  deuda,
  saldo,
  debe,
  leDeben,
}) {
  // console.log(nombre, prestamo, deuda, saldo, debe, leDeben);
  function colorCard(valorSaldo) {
    let color = "blue";
    if (valorSaldo > 0) {
      color = "green";
    } else if (valorSaldo < 0) {
      color = "red";
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
              Le ha prestado: $ <span>{prestamo}</span>
            </h3>
            <h3>
              Le debe: $ <span>{deuda}</span>
            </h3>
          </div>
          <div className="saldo">
            <p>Saldo</p>
            <h1>{saldo}</h1>
          </div>
        </div>
        {saldo > 0 ? (
          <p className="greenP">Saldo positivo</p>
        ) : null}
        {saldo < 0 ? (
          <p className="redP">Saldo negativo</p>
        ) : null}
        {saldo == 0 ? (
          <p className="blueP">Saldo neutro</p>
        ) : null}
      </div>
    </div>
  );
}
