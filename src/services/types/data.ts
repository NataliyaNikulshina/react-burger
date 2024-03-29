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

export interface IIngDetailsInitial {
  name: string,
  image_large: string,
  calories: number,
  proteins: number,
  fat: number,
  carbohydrates: number
} 

export interface IOrderInfo {
  createdAt: string;
  updatedAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: "done" | "created";
  _id: string;
  price: number;
}

export interface IOrder {
  order: IOrderInfo,
  name: string,
  success: boolean
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

export interface IWsMessage {
  readonly orders: Array<IOrderInfo>;
  readonly total: number;
  readonly totalToday: number;
}

export type TUseForm = {
  email: string;
  name: string;
  password: string;
}
