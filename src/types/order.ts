type Restaurant = {
  id: number;
  name: string;
  logo: string;
};

type Pricing = {
  subtotal: number;
  serviceFee: number;
  deliveryFee: number;
  totalPrice: number;
};

type OrderItem = {
  menuId: number;
  menuName: string;
  price: number;
  quantity: number;
  itemTotal: number;
};

type RestaurantOrder = {
  restaurant: Restaurant;
  items: OrderItem[];
  subtotal: number;
};

type Transaction = {
  id: number;
  transactionId: string;
  paymentMethod: string;
  status: string;
  pricing: Pricing;
  restaurants: RestaurantOrder[];
  createdAt: string;
};

type DeliveryStatus =
  | undefined
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'done'
  | 'cancelled';

type RestaurantOrderResponse = {
  restaurantId: number;
  restaurantName: string;
  items: OrderItem[];
  subtotal: number;
};

type OrderResponse = {
  id: number;
  transactionId: string;
  status: string;
  paymentMethod: string;
  pricing: Pricing;
  restaurants: RestaurantOrderResponse[];
  createdAt: string;
  updatedAt: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type Filter = {
  status: string;
};

type OrdersData = {
  orders: OrderResponse[];
  pagination: Pagination;
  filter: Filter;
};

type OrdersDataStatusUpdate = {
  id: number;
  transactionId: string;
  status: string;
  updatedAt: string;
};

type PostCheckoutReq = {
  paymentMethod: string;
  deliveryAddress: string;
  notes: string;
};

type PostCheckoutRes = {
  success: boolean;
  message: string;
  data: {
    transaction: Transaction;
  };
};

type GetMyOrderParamsReq = {
  status: DeliveryStatus;
  page?: number;
  limit?: number;
};

type GetMyOrderRes = {
  success: boolean;
  message: string;
  data: OrdersData;
};

type PutOrderStatusReq = {
  status: string;
};

type PutOrderStatusRes = {
  success: string;
  message: string;
  data: {
    order: OrdersDataStatusUpdate;
  };
};

export type {
  PostCheckoutReq,
  PostCheckoutRes,
  GetMyOrderParamsReq,
  GetMyOrderRes,
  PutOrderStatusReq,
  PutOrderStatusRes,
  DeliveryStatus,
};
