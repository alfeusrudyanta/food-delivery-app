import apiCart from '@/services/queries/cart';
import type { PostCartReq, PutCartReq } from '@/types/cart';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useCart = () => {
  const queryClient = useQueryClient();

  const cart = useQuery({
    queryKey: ['cart'],
    queryFn: () => apiCart.getCart(),
  });

  const addCart = useMutation({
    mutationFn: (data: PostCartReq) => apiCart.postCart(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const deleteAllCart = useMutation({
    mutationFn: () => apiCart.deleteAllCart(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const updateCart = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PutCartReq }) =>
      apiCart.putCart(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  const deleteCart = useMutation({
    mutationFn: (id: number) => apiCart.deleteCart(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });

  // Loading state
  const loading = {
    cart: cart.isLoading,
    addCart: addCart.isPending,
    deleteAllCart: deleteAllCart.isPending,
    updateCart: updateCart.isPending,
    deleteCart: deleteCart.isPending,
  };

  // Error state
  const error = {
    cart: cart.error,
    addCart: addCart.error,
    deleteAllCart: deleteAllCart.error,
    updateCart: updateCart.error,
    deleteCart: deleteCart.error,
  };

  // Success states
  const success = {
    addCart: addCart.isSuccess,
    deleteAllCart: deleteAllCart.isSuccess,
    updateCart: updateCart.isSuccess,
    deleteCart: deleteCart.isSuccess,
  };

  return {
    // Actions
    addCart: addCart.mutate,
    deleteAllCart: deleteAllCart.mutate,
    updateCart: updateCart.mutate,
    deleteCart: deleteCart.mutate,
    refetchCart: cart.refetch,

    // States
    loading,
    error,
    success,

    // Data
    cart: cart.data,
  };
};

export default useCart;
