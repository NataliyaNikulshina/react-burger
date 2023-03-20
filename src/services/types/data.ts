export interface IIngredient {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  _idInBasket?: string;
  index?: number;
  }

export interface IOrderInfo {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "done" | "created";
  _id: string;
}

export interface IUser {
  email: string;
  name: string;
}

export interface IUserRegister {
  email: string;
  name: string;
  password: string;
}

export interface IUserLogin {
  email: string;
  password: string;
}