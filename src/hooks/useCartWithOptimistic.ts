import { useAppDispatch } from '@/features/store';
import useCart from './useCart';
import type { MenuItem, PostCartReq, Restaurant } from '@/types/cart';
import {
  addItem,
  removeItem,
  updateItemQuantity,
} from '@/features/cart/cartSlice';

const useCartWithOptimistic = () => {
  const dispatch = useAppDispatch();
  const cartHook = useCart();

  const optimisticAddItem = async (
    data: PostCartReq,
    restaurant: Restaurant,
    menu: MenuItem
  ) => {
    dispatch(addItem({ restaurant, menu, quantity: data.quantity }));

    try {
      await cartHook.addCart(data);
      await cartHook.refetchCart();
    } catch (error) {
      await cartHook.refetchCart();
      console.log('Failed to add item:', error);
    }
  };

  const optimisticUpdateItem = async (
    restaurantId: number,
    menuId: number,
    quantity: number,
    orderId: number
  ) => {
    dispatch(updateItemQuantity({ restaurantId, menuId, quantity }));

    try {
      await cartHook.updateCart({ id: orderId, data: { quantity } });
      await cartHook.refetchCart();
    } catch (error) {
      await cartHook.refetchCart();
      console.log('Failed to update item:', error);
    }
  };

  const optimisticRemoveItem = async (
    restaurantId: number,
    menuId: number,
    orderId: number
  ) => {
    dispatch(removeItem({ restaurantId, menuId }));

    try {
      await cartHook.deleteCart(orderId);
      await cartHook.refetchCart();
    } catch (error) {
      await cartHook.refetchCart();
      console.log('Failed to remove item:', error);
    }
  };

  return {
    optimisticAddItem,
    optimisticUpdateItem,
    optimisticRemoveItem,
  };
};

export default useCartWithOptimistic;
