import { getCookie } from "cookies-next";

export async function getEvents() {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/evento/list`,
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

export async function newEvents(data) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/create/event`,
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

export async function inviteContact(data) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/create/invitation`,
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

export async function changeDataEvents(data) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/modify/event`,
    {
      method: "PUT",
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

export async function getEventParticipants(id) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/event/participants/list/${id}/`,
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

export function processData(data, id) {
  let array = [];
  data.eventos_creador.map((item) => {
    let itemChange = {...item, creator: "me"}
    array.push(itemChange);
  })
  data.eventos_participante.map((item) => {
    let itemChange = {...item.evento, creator: "other"}
    array.push(itemChange);
  });
  let event = array.filter((item) => item.id == id);
  return event[0];
}
