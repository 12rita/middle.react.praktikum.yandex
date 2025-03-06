export interface IOrder {
  number: number;
}

export interface IOrdersResponse {
  name: string;
  order: IOrder;
  success: boolean;
}

export interface IInitialState {
  name: string;
  order: IOrder;
  loading: boolean;
  error: string;
}

export interface IOrderContent {
  id: string;
  timestamp: string;
  name: string;
  ingredients: string[];
  price: number;
}
