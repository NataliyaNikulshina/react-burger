const api = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const checkJson = (res) => res.json().then(data => res.ok ? data : Promise.reject(data))

// создаем функцию проверки на `success`
const checkSuccess = (res) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

function request(url, method, data = null, token = null) {
  const options = {
    method: method,
    headers: api.headers,
  }
  if (data) options.body = JSON.stringify(data);
  if (token) options.headers = {...options.headers, 'Authorization': token};
 // console.log(options, fetch);
  return fetch(url, options).then(checkJson).then(checkSuccess) 
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

export const postNewPassword = (password, code) => {
  return request((`${api.url}/password-reset/reset`), "POST", {password, token: code})
};

export const postRegister = ({email, password, name}) => {
  return request((`${api.url}/auth/register`), "POST" , {email, password, name})
};

export const getUserInfo = (token) => {
  return request(`${api.url}/auth/user`, "GET", null, token)
};

export const updateUserInfo = (upData, token) => {
  return request(`${api.url}/auth/user`, "PATCH", upData, token)
};

export const loginUser = ({email, password}) => {
  return request((`${api.url}/auth/login`), "POST", {email, password})
};

export const logoutUser = (refreshToken) => {
  return request((`${api.url}/auth/logout`), "POST", {token: refreshToken})
};

export const updateAccessToken = (refreshToken) => {
  return request((`${api.url}/auth/token`), "POST", {token: refreshToken})
};
