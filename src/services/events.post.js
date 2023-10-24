import { getCookie } from "cookies-next";

export async function newEvents(data) {
  const token = getCookie("Token");
  const res = await fetch("http://localhost:8000/core/create/event", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();

  return response;
}