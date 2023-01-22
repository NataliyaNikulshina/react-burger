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

function request(url, options) {
  return fetch(url, options).then(checkJson) 
}

export const getProductData = () => {
  return request((`${api.url}/ingredients`), {
    method: "GET",
    headers: api.headers,
  });
};

export const postOrderDetails = (data) => {
  return request((`${api.url}/orders`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  });
};
