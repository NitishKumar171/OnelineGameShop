import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '../services/authService';
import { useStore } from '../store/useStore';
import { toast } from 'react-hot-toast';

export function useAuth() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { setUser } = useStore();

  const { data: currentUser, isLoading: isLoadingUser } = useQuery(
    'currentUser',
    () => authService.getCurrentUser(),
    {
      onSuccess: (user) => {
        if (user) {
          setUser(user);
        }
      },
    }
  );

  const loginMutation = useMutation(
    (credentials: { email: string; password: string }) =>
      authService.login(credentials.email, credentials.password),
    {
      onSuccess: (data) => {
        setUser(data.user);
        queryClient.setQueryData('currentUser', data.user);
        toast.success('Welcome back!');
        navigate('/');
      },
    }
  );

  const registerMutation = useMutation(
    (userData: { email: string; password: string; name: string }) =>
      authService.register(userData),
    {
      onSuccess: (data) => {
        setUser(data.user);
        queryClient.setQueryData('currentUser', data.user);
        toast.success('Registration successful!');
        navigate('/');
      },
    }
  );

  const logout = () => {
    authService.logout();
    setUser(null);
    queryClient.setQueryData('currentUser', null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  return {
    currentUser,
    isLoadingUser,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isLoading,
    register: registerMutation.mutate,
    isRegistering: registerMutation.isLoading,
    logout,
  };
}