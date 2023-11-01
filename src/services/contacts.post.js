import { getCookie } from "cookies-next";

export async function newContacts(data) {
  const token = getCookie("Token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/core/contacto`, {
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

export async function deleteContacts(data) {
  const token = getCookie("Token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/core/contacto/delete`, {
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