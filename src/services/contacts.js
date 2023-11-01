import { getCookie } from "cookies-next";

export async function getContacts() {
  const token = getCookie("Token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/core/contacto/list`, {
    method: "GET",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();

  return response;
}