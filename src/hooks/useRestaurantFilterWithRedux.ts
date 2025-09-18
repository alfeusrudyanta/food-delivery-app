import { useAppSelector } from '@/features/store';
import { useRestaurantFilter } from './useRestaurant';

const useRestaurantFilterWithRedux = () => {
  const filterState = useAppSelector((state) => state.filter);

  const apiParams = {
    location: filterState.location,
    range: filterState.range,
    priceMin: filterState.priceMin,
    priceMax: filterState.priceMax,
    rating: filterState.rating,
    page: filterState.page,
    limit: filterState.limit,
  };
  return useRestaurantFilter(apiParams);
};

export default useRestaurantFilterWithRedux;
