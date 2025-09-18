import apiOrder from '@/services/queries/order';
import type {
  GetMyOrderParamsReq,
  PostCheckoutReq,
  PutOrderStatusReq,
} from '@/types/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useOrder = () => {
  const queryClient = useQueryClient();

  const addOrder = useMutation({
    mutationFn: (data: PostCheckoutReq) => apiOrder.PostCheckout(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const updateOrderStatus = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PutOrderStatusReq }) =>
      apiOrder.putOrderStatus(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  // Loading state
  const loading = {
    addOrder: addOrder.isPending,
    updateOrderStatus: updateOrderStatus.isPending,
  };

  // Error state
  const error = {
    addOrder: addOrder.error,
    updateOrderStatus: updateOrderStatus.error,
  };

  // Success states
  const success = {
    addOrder: addOrder.isSuccess,
    updateOrderStatus: updateOrderStatus.isSuccess,
  };

  return {
    // Actions
    addOrder: addOrder.mutate,
    updateOrderStatus: updateOrderStatus.mutate,

    // States
    loading,
    error,
    success,
  };
};

const useMyOrder = (params: GetMyOrderParamsReq) => {
  const orderQuery = useQuery({
    queryKey: ['orders', params],
    queryFn: () => apiOrder.getMyOrder(params),
  });

  return {
    orders: orderQuery.data,
    isLoading: orderQuery.isLoading,
    error: orderQuery.error,
    refetch: orderQuery.refetch,
  };
};

export { useOrder, useMyOrder };
