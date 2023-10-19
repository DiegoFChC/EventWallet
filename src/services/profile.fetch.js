import { getCookie } from "cookies-next";

export async function profileGet() {
  const token = getCookie("Token");
  const res = await fetch("http://127.0.0.1:8000/core/modify", {
    method: "GET",
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();

  return response;
}

export async function profilePut(data) {
  const token = getCookie("Token");
  const res = await fetch("http://127.0.0.1:8000/core/modify", {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Authorization": token,
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();

  return response;
}