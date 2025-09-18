import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import apiAuth from '@/services/queries/auth';
import type {
  PostLoginReq,
  PostRegisterReq,
  PutProfileReq,
} from '@/types/auth';
import getCookie from '@/lib/getCookies';

const useAuth = () => {
  const queryClient = useQueryClient();
  const token = getCookie('token');

  const registerMutation = useMutation({
    mutationFn: (data: PostRegisterReq) => apiAuth.postRegister(data),
    onSuccess: (data) => {
      if (data.data.token) {
        document.cookie = `token=${data.data.token}; max-age=${
          7 * 24 * 60 * 60
        }; path=/`;
      }
    },
  });

  const loginMutation = useMutation({
    mutationFn: (data: PostLoginReq) => apiAuth.postLogin(data),
    onSuccess: (data) => {
      if (data.data.token) {
        document.cookie = `token=${data.data.token}; max-age=${
          7 * 24 * 60 * 60
        }; path=/`;
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  const logout = () => {
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    queryClient.removeQueries({ queryKey: ['profile'] });
    loginMutation.reset();
  };

  const profileQuery = useQuery({
    queryKey: ['profile'],
    queryFn: () => apiAuth.getProfile(),
    retry: false,
    enabled: !!token,
  });

  const profileMutation = useMutation({
    mutationFn: (data: PutProfileReq) => apiAuth.putProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });

  // Loading state
  const loading = {
    register: registerMutation.isPending,
    login: loginMutation.isPending,
    profile: profileQuery.isLoading,
    updateProfile: profileMutation.isPending,
  };

  // Error state
  const error = {
    register: registerMutation.error,
    login: loginMutation.error,
    profile: profileQuery.error,
    updateProfile: profileMutation.error,
  };

  // Success states
  const success = {
    register: registerMutation.isSuccess,
    login: loginMutation.isSuccess,
    updateProfile: profileMutation.isSuccess,
  };

  return {
    // Actions
    register: registerMutation.mutate,
    login: loginMutation.mutate,
    logout,
    updateProfile: profileMutation.mutate,
    refetchProfile: profileQuery.refetch,

    // States
    loading,
    error,
    success,

    // Data
    profile: profileQuery.data,
    isLoggedIn: !!token,
  };
};

export default useAuth;
