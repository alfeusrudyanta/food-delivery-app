type Restaurant = {
  id: number;
  name: string;
  logo: string;
};

type MenuItem = {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
};

type CartItem = {
  id: number;
  menu: MenuItem;
  quantity: number;
  itemTotal: number;
};

type RestaurantCart = {
  restaurant: Restaurant;
  items: CartItem[];
  subtotal: number;
};

type CartSummary = {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
};

type CartData = {
  cart: RestaurantCart[];
  summary: CartSummary;
};

type PostCartItemData = {
  cartItem: {
    id: number;
    restaurant: Restaurant;
    menu: MenuItem;
    quantity: number;
    itemTotal: number;
  };
};

type GetCartRes = {
  success: boolean;
  message: string;
  data: CartData;
};

type PostCartReq = {
  restaurantId: number;
  menuId: number;
  quantity: number;
};

type PostCartRes = {
  success: boolean;
  message: string;
  data: PostCartItemData;
};

type DeleteAllCartRes = {
  success: boolean;
  message: string;
  data: null;
};

type PutCartReq = {
  quantity: number;
};

type PutCartRes = PostCartRes;

type DeleteCartRes = DeleteAllCartRes;

export type {
  GetCartRes,
  PostCartReq,
  PostCartRes,
  DeleteAllCartRes,
  PutCartReq,
  PutCartRes,
  DeleteCartRes,
  CartData,
  Restaurant,
  MenuItem,
  RestaurantCart,
};
