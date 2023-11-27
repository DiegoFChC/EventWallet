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
