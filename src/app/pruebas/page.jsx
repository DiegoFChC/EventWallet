async function getData() {
  const res = await fetch("http://127.0.0.1:8000/core/login", {
    method: "POST",
    body: JSON.stringify({
      username: "diego@gmail.com",
      password: "123456",
    }),
    headers: {
      // Authorization: `Token`,
      "Content-Type": "application/json",
    },
  });

  // Espera a que la promesa de la respuesta se resuelva
  const data = await res.json();

  return data;
}

export default async function Pruebas() {
  const data = await getData();
  console.log(data);

  return <div className="Pruebas">Pruebas</div>;
}
