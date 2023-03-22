import { IIngredient, IUser, IUserRegister, IUserLogin } from "../services/types/data";

const api: any = {
  url: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const apiWS = {
  urlWS: "wss://norma.nomoreparties.space/orders/all",
  urlProfile: (token: string) => `wss://norma.nomoreparties.space/orders?token=${token}`
}

const checkJson = (res: Response) => res.json().then(data => res.ok ? data : Promise.reject(data))

// создаем функцию проверки на `success`
const checkSuccess = (res: any) => {
  if (res && res.success) {
    return res;
  }
  // не забываем выкидывать ошибку, чтобы она попала в `catch`
  return Promise.reject(`Ответ не success: ${res}`);
};

export interface IOptions  {
  method: string,
  headers: any,
  body?: string
}

function request(url: string, method: string, data: null | any = null, token: null | string = null) {
  const options: IOptions = {
    method: method,
    headers: api.headers
  }
  if (data) options.body = JSON.stringify(data);
  if (token) options.headers = {...options.headers, 'Authorization': token};
  //console.log(options, fetch);
  return fetch(url, options).then(checkJson).then(checkSuccess) 
}

export const createOrder = (ingredientsList: string[], token: string | null) => {
  return request(`${api.url}/orders`, "POST", {ingredients: ingredientsList}, token)
};

export const getProductData = () => {
  return request((`${api.url}/ingredients`), "GET");
};

export const postOrderDetails = (data: IIngredient[]) => {
  return request((`${api.url}/orders`), "POST", {ingredients: data})
};

export const postEmailForReset = (email: string) => {
  return request((`${api.url}/password-reset`), "POST", {email})
};

export const postNewPassword = (password: string, code: number) => {
  return request((`${api.url}/password-reset/reset`), "POST", {password, token: code})
};

export const postRegister = ({email, password, name}: IUserRegister) => {
  return request((`${api.url}/auth/register`), "POST" , {email, password, name})
};

export const getUserInfo = (token: string | null) => {
  return request(`${api.url}/auth/user`, "GET", null, token)
};

export const updateUserInfo = (upData: IUser, token: string | null) => {
  return request(`${api.url}/auth/user`, "PATCH", upData, token)
};

export const loginUser = ({email, password}: IUserLogin) => {
  return request((`${api.url}/auth/login`), "POST", {email, password})
};

export const logoutUser = (refreshToken: string | null) => {
  return request((`${api.url}/auth/logout`), "POST", {token: refreshToken})
};

export const updateAccessToken = (refreshToken: string | null) => {
  return request((`${api.url}/auth/token`), "POST", {token: refreshToken})
};
