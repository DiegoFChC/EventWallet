import { getCookie } from "cookies-next";

export async function getNotifications() {
  const token = getCookie("Token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/core/invitation/list`, {
    method: "GET",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();

  return response;
}

export async function postNotifications(data) {
  const token = getCookie("Token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/core/invitation/respond`, {
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