import { getCookie } from "cookies-next";

export async function getContacts() {
  const token = getCookie("Token");
  const res = await fetch("http://127.0.0.1:8000/core/contacto/list", {
    method: "GET",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();

  return response;
}