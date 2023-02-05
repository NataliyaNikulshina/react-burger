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

export const postEmailForReset = (email) => {
  return request((`${api.url}/password-reset`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email
    }),
  });
};

export const postNewPassword = (password, token) => {
  return request((`${api.url}/password-reset/reset`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      password, token
    }),
  });
};

export const postNewUser = (email, password, name) => {
  return request((`${api.url}/auth/register`), {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      email, password, name
    }),
  });
};

export const getUserInfo = () => {
  return request((`${api.url}/auth/user`), {
    method: "GET",
    headers: api.headers,
  });
};
