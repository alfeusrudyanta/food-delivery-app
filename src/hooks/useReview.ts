import apiReview from '@/services/queries/review';
import type {
  GetMyReviewParamsReq,
  GetRestaurantReviewParamsReq,
  PostReviewReq,
  PutReviewReq,
} from '@/types/review';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const useReview = () => {
  const queryClient = useQueryClient();

  const addReview = useMutation({
    mutationFn: (data: PostReviewReq) => apiReview.postReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  const updateReview = useMutation({
    mutationFn: ({ id, data }: { id: number; data: PutReviewReq }) =>
      apiReview.putReview(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id: number) => apiReview.deleteReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['review'] });
    },
  });

  // Loading state
  const loading = {
    add: addReview.isPending,
    update: updateReview.isPending,
    delete: deleteReviewMutation.isPending,
  };

  // Error state
  const error = {
    add: addReview.error,
    update: updateReview.error,
    delete: deleteReviewMutation.error,
  };

  // Success states
  const success = {
    add: addReview.isSuccess,
    update: updateReview.isSuccess,
    delete: deleteReviewMutation.isSuccess,
  };

  return {
    // Actions
    addReview: addReview.mutate,
    updateReview: updateReview.mutate,
    deleteReview: deleteReviewMutation.mutate,

    // States
    loading,
    error,
    success,
  };
};

const useRestaurantReview = (
  id: number,
  params: GetRestaurantReviewParamsReq
) => {
  const restoReview = useQuery({
    queryKey: ['review', 'restaurant', id, params],
    queryFn: () => apiReview.getRestaurantReview(id, params),
    enabled: !!id,
  });

  return {
    data: restoReview.data,
    isLoading: restoReview.isLoading,
    isError: restoReview.isError,
    error: restoReview.error,
    refetch: restoReview.refetch,
  };
};

const useMyReview = (params?: GetMyReviewParamsReq) => {
  const myReview = useQuery({
    queryKey: ['review', 'my', params],
    queryFn: () => apiReview.getMyReview(params || {}),
  });

  return {
    data: myReview.data,
    isLoading: myReview.isLoading,
    isError: myReview.isError,
    error: myReview.error,
    refetch: myReview.refetch,
  };
};

export { useReview, useRestaurantReview, useMyReview };
