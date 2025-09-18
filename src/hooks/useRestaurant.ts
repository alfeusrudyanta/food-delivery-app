import apiRestaurant from '@/services/queries/restaurant';
import type {
  GetRestoIdParamsReq,
  GetRestoParamsReq,
} from '@/types/restaurant';
import { useQuery } from '@tanstack/react-query';

const useRestaurantFilter = (params: GetRestoParamsReq) => {
  const restoFilter = useQuery({
    queryKey: ['restaurant', 'filter', params],
    queryFn: () => apiRestaurant.getResto(params),
    staleTime: 5 * 60 * 1000,
  });

  return {
    restaurantFilterData: restoFilter.data,
    isLoading: restoFilter.isLoading,
    isError: restoFilter.isError,
    error: restoFilter.error,
    refetch: restoFilter.refetch,
  };
};

const useRecommendedRestaurant = () => {
  const recommendedResto = useQuery({
    queryKey: ['restaurant', 'recommended'],
    queryFn: () => apiRestaurant.getRestoRecommended(),
    staleTime: 10 * 60 * 1000,
  });

  return {
    recommendedResto: recommendedResto.data,
    isLoading: recommendedResto.isLoading,
    isError: recommendedResto.isError,
    error: recommendedResto.error,
    refetch: recommendedResto.refetch,
  };
};

const useRestoId = (id: number, params: GetRestoIdParamsReq) => {
  const resto = useQuery({
    queryKey: ['restaurant', 'detail', id, params],
    queryFn: () => apiRestaurant.getRestoId(id, params),
    enabled: !!id,
  });

  return {
    restoData: resto.data,
    isLoading: resto.isLoading,
    isError: resto.isError,
    error: resto.error,
    refetch: resto.refetch,
  };
};

export { useRestaurantFilter, useRecommendedRestaurant, useRestoId };
