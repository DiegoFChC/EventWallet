export async function postRequest(url, data) {
  fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      // Authorization: `Token`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {res.json()})
    .catch((error) => {
      console.log("erorrr")
      return error;
    })
    .then((response) => {
      return response;
    });
}
