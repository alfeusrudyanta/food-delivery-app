import type { CartData, MenuItem, Restaurant } from '@/types/cart';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type CartState = CartData;

const initialState: CartState = {
  cart: [],
  summary: {
    totalItems: 0,
    totalPrice: 0,
    restaurantCount: 0,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{
        restaurant: Restaurant;
        menu: MenuItem;
        quantity: number;
      }>
    ) => {
      const { restaurant, menu, quantity } = action.payload;
      const itemTotal = menu.price * quantity;

      const restaurantIndex = state.cart.findIndex(
        (r) => r.restaurant.id === restaurant.id
      );

      if (restaurantIndex >= 0) {
        // Restaurant exists, find if item already exists
        const restaurantCart = state.cart[restaurantIndex];
        const existingItemIndex = restaurantCart.items.findIndex(
          (item) => item.menu.id === menu.id
        );

        if (existingItemIndex >= 0) {
          // Item exists, update quantity
          const existingItem = restaurantCart.items[existingItemIndex];
          existingItem.quantity += quantity;
          existingItem.itemTotal += itemTotal;
        } else {
          // Item doesn't exist, add new item
          restaurantCart.items.push({
            id: Date.now(), // Temporary ID (will be replaced by server)
            menu,
            quantity,
            itemTotal,
          });
        }

        // Update restaurant subtotal
        restaurantCart.subtotal += itemTotal;
      } else {
        // Restaurant doesn't exist, create new restaurant entry
        state.cart.push({
          restaurant,
          items: [
            {
              id: Date.now(), // Temporary ID (will be replaced by server)
              menu,
              quantity,
              itemTotal,
            },
          ],
          subtotal: itemTotal,
        });
        state.summary.restaurantCount += 1;
      }

      // Update summary
      state.summary.totalItems += quantity;
      state.summary.totalPrice += itemTotal;
    },

    // Update an existing item's quantity
    updateItemQuantity: (
      state,
      action: PayloadAction<{
        restaurantId: number;
        menuId: number;
        quantity: number;
      }>
    ) => {
      const { restaurantId, menuId, quantity } = action.payload;

      // Find the restaurant
      const restaurant = state.cart.find(
        (r) => r.restaurant.id === restaurantId
      );
      if (!restaurant) return;

      // Find the item
      const item = restaurant.items.find((i) => i.menu.id === menuId);
      if (!item) return;

      // Calculate differences
      const oldQuantity = item.quantity;
      const quantityDiff = quantity - oldQuantity;
      const priceDiff = item.menu.price * quantityDiff;

      // Update the item
      item.quantity = quantity;
      item.itemTotal = item.menu.price * quantity;

      // Update restaurant subtotal
      restaurant.subtotal += priceDiff;

      // Update summary
      state.summary.totalItems += quantityDiff;
      state.summary.totalPrice += priceDiff;

      // Remove item if quantity is 0
      if (quantity === 0) {
        restaurant.items = restaurant.items.filter((i) => i.menu.id !== menuId);

        // Remove restaurant if no items left
        if (restaurant.items.length === 0) {
          state.cart = state.cart.filter(
            (r) => r.restaurant.id !== restaurantId
          );
          state.summary.restaurantCount -= 1;
        }
      }
    },

    // Remove an item from the cart
    removeItem: (
      state,
      action: PayloadAction<{
        restaurantId: number;
        menuId: number;
      }>
    ) => {
      const { restaurantId, menuId } = action.payload;

      const restaurant = state.cart.find(
        (r) => r.restaurant.id === restaurantId
      );
      if (!restaurant) return;

      const itemIndex = restaurant.items.findIndex((i) => i.menu.id === menuId);
      if (itemIndex === -1) return;

      const item = restaurant.items[itemIndex];

      // Remove the item
      restaurant.items.splice(itemIndex, 1);

      // Update restaurant subtotal
      restaurant.subtotal -= item.itemTotal;

      // Update summary
      state.summary.totalItems -= item.quantity;
      state.summary.totalPrice -= item.itemTotal;

      // Remove restaurant if no items left
      if (restaurant.items.length === 0) {
        state.cart = state.cart.filter((r) => r.restaurant.id !== restaurantId);
        state.summary.restaurantCount -= 1;
      }
    },
  },
});

export const { addItem, updateItemQuantity, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
