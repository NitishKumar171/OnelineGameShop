import { useQuery, useMutation, useQueryClient } from 'react-query';
import { orderService, CreateOrderData } from '../services/orderService';
import { Order } from '../types';
import { toast } from 'react-hot-toast';

export function useOrders(params?: {
  page?: number;
  limit?: number;
  status?: Order['status'];
}) {
  const queryClient = useQueryClient();

  const {
    data,
    isLoading,
    error,
    refetch
  } = useQuery(
    ['orders', params],
    () => orderService.getOrders(params),
    {
      keepPreviousData: true,
    }
  );

  const createOrderMutation = useMutation(
    (orderData: CreateOrderData) => orderService.createOrder(orderData),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
        toast.success('Order placed successfully');
      },
    }
  );

  const updateOrderStatusMutation = useMutation(
    ({ id, status }: { id: string; status: Order['status'] }) =>
      orderService.updateOrderStatus(id, status),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
        toast.success('Order status updated');
      },
    }
  );

  const verifyPaymentMutation = useMutation(
    ({ orderId, paymentDetails }: { 
      orderId: string; 
      paymentDetails: { transactionId: string; paymentMethod: string; }
    }) => orderService.verifyPayment(orderId, paymentDetails),
    {
      onSuccess: (data) => {
        if (data.verified) {
          queryClient.invalidateQueries('orders');
          toast.success('Payment verified successfully');
        } else {
          toast.error('Payment verification failed');
        }
      },
    }
  );

  return {
    orders: data?.orders || [],
    total: data?.total || 0,
    isLoading,
    error,
    refetch,
    createOrder: createOrderMutation.mutate,
    updateOrderStatus: updateOrderStatusMutation.mutate,
    verifyPayment: verifyPaymentMutation.mutate,
    isCreatingOrder: createOrderMutation.isLoading,
    isUpdatingStatus: updateOrderStatusMutation.isLoading,
    isVerifyingPayment: verifyPaymentMutation.isLoading,
  };
}