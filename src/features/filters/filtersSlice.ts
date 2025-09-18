import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type FilterState = {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  page: number;
  limit: number;
};

const initialState: FilterState = {
  location: undefined,
  range: undefined,
  priceMin: undefined,
  priceMax: undefined,
  rating: undefined,
  page: 1,
  limit: 10,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setRange: (state, action: PayloadAction<number | undefined>) => {
      state.range = action.payload;
    },
    setPriceMin: (state, action: PayloadAction<number | undefined>) => {
      state.priceMin = action.payload;
    },
    setPriceMax: (state, action: PayloadAction<number | undefined>) => {
      state.priceMax = action.payload;
    },
    setRating: (state, action: PayloadAction<number | undefined>) => {
      state.rating = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
  },
});

export const { setRange, setPriceMin, setPriceMax, setRating, setPage } =
  filterSlice.actions;
export default filterSlice.reducer;
