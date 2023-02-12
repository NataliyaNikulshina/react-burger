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

function request(url, method, data = null, token = null) {
  const options = {
    method: method,
    headers: api.headers,
  }
  if (data) options.body = JSON.stringify(data)
  if (token) options.headers.authorization = token
  return fetch(url, options).then(checkJson) 
}

export const getProductData = () => {
  return request((`${api.url}/ingredients`), "GET");
};

export const postOrderDetails = (data) => {
  return request((`${api.url}/orders`), "POST", {ingredients: data})
};

export const postEmailForReset = (email) => {
  return request((`${api.url}/password-reset`), "POST", {email})
};

export const postNewPassword = (password, token) => {
  return request((`${api.url}/password-reset/reset`), "POST", {password, token})
};

export const postRegister = ({email, password, name}) => {
  return request((`${api.url}/auth/register`), "POST" , {email, password, name})
};

export const getUserInfo = (token) => {
  return request((`${api.url}/auth/user`), "GET", null, token)
};

export const loginUser = ({email, password}) => {
  return request((`${api.url}/auth/login`), "POST", {email, password})
};

export const logoutUser = (refreshToken) => {
  return request((`${api.url}/auth/logout`), "POST", {token: refreshToken})
};

export const updateToken = (refreshToken) => {
  return request((`${api.url}/auth/token`), "POST", {token: refreshToken})
};
