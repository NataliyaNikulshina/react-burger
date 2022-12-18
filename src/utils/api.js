const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

function checkJson(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

export const getProductData = () => {
  return fetch((`${api.url}/ingredients`), {
    method: "GET",
    headers: api.headers,
  }).then(checkJson);
};

export const postOrderDetails = (data) => {
  return fetch((`${api.url}/orders`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  }).then(checkJson);
};
