const api = {
  urlIng: "https://norma.nomoreparties.space/api/ingredients",
  urlBurger: "https://norma.nomoreparties.space/api/orders",
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
  return fetch(api.urlIng, {
    method: "GET",
    headers: api.headers,
  }).then((res) => checkJson(res));
};

export const postOrderDetails = (data) => {
  return fetch(api.urlBurger, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      ingredients: data,
    }),
  }).then((res) => checkJson(res));
};
