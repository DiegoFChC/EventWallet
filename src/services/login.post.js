export async function loginResponse(data) {
  const res = await fetch("http://127.0.0.1:8000/core/login", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });

  // if (!res.ok) {
  //   // return {
  //   //   error: "true",
  //   //   status: res.status,
  //   //   statusText: res.statusText,
  //   // };
  // }

  // Espera a que la promesa de la respuesta se resuelva
  const response = await res.json();

  return response;
}
