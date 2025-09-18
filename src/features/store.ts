import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '@/features/filters/filtersSlice';
import cartReducer from '@/features/cart/cartSlice';

import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
