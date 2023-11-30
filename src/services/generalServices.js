export function formatNumber(number) {
  return number.toLocaleString("es-CO", {
    style: "decimal",
    minimumFractionDigits: 0,
  });
}