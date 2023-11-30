import { getCookie } from "cookies-next";

export async function getUserBalances(id_event, id_user) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/event/user/balance/${id_event}/${id_user}/`,
    {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  const response = await res.json();

  return response;
}

export async function getUserGeneralBalances() {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/user/balance/`,
    {
      method: "GET",
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  const response = await res.json();

  return response;
}

export async function payAmount(data) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/event/user/balance/pay/`,
    {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        Authorization: token,
        "Content-Type": "application/json",
      },
    }
  );
  const response = await res.json();

  return response;
}

export function filterData(data, filtro, atribute, id_user) {
  let event = null;
  event = data.filter((item) => item[filtro] == atribute);
  // let eventNotUser = event.filter((item) => item.usuario_id != id_user)
  // console.log("mi id ", id_user);
  let newData = {
    ...event[0],
    saldos: event[0].saldos.filter((item) => item.usuario_id != id_user),
  };
  return newData;
}

function toArrayOfObjects(object) {
  const array = [];

  for (const key in object) {
    array.push({
      [key]: object[key],
    });
  }

  return array;
}
