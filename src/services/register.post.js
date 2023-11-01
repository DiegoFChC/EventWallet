export async function registerResponse(data) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/core/create`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const response = await res.json();

  return response;
}
