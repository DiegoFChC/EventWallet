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

export async function getUserGeneralBalances(id_user) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/user/balance/${id_user}/`,
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

export function filterData(data, filtro, atribute) {
  let event = null;
  event = data.filter((item) => item[filtro] == atribute)
  return event[0];
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
