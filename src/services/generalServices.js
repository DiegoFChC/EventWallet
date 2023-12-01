export function formatNumber(number) {
  return number.toLocaleString("es-CO", {
    style: "decimal",
    minimumFractionDigits: 0,
  });
}

export function generalBalances(balances) {
  let data = { prestamo: 0, deuda: 0, saldo: 0 };

  let filtro1 = balances.map((item) => {
    return item.saldos;
  });

  const allDataArrays = filtro1.reduce(
    (filtro1, item) => filtro1.concat(item),
    []
  );

  allDataArrays.map((item) => {
    data = {
      prestamo: data.prestamo + item.prestamo,
      deuda: data.deuda + item.deuda,
      saldo: data.saldo + item.saldo,
    };
  });

  return data;
}
