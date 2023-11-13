import { getCookie } from "cookies-next";

export async function createActivity(data) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/create/activity`,
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

export async function getActivity(id) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/activity/list/${id}/`,
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

export async function deleteActivity(data) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/activity/delete`,
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

export async function modifyActivity(data) {
  const token = getCookie("Token");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/core/modify/activity`,
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