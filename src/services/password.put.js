import { getCookie } from "cookies-next";

export async function passwordPut(data) {
  const token = getCookie("Token");
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/core/modify/password`, {
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