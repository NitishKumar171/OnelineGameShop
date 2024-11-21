import api from './api';
import { Order } from '../types';

export interface CreateOrderData {
  items: Array<{
    gameId: string;
    quantity: number;
  }>;
  paymentMethod: 'upi' | 'card';
  paymentDetails: {
    upiId?: string;
    transactionId?: string;
    cardDetails?: {
      last4: string;
      brand: string;
    };
  };
}

export const orderService = {
  createOrder: async (orderData: CreateOrderData) => {
    const { data } = await api.post<Order>('/orders', orderData);
    return data;
  },

  getOrders: async (params?: {
    page?: number;
    limit?: number;
    status?: Order['status'];
  }) => {
    const { data } = await api.get<{ orders: Order[]; total: number }>('/orders', { 
      params 
    });
    return data;
  },

  getOrderById: async (id: string) => {
    const { data } = await api.get<Order>(`/orders/${id}`);
    return data;
  },

  updateOrderStatus: async (id: string, status: Order['status']) => {
    const { data } = await api.patch<Order>(`/orders/${id}/status`, { status });
    return data;
  },

  verifyPayment: async (orderId: string, paymentDetails: {
    transactionId: string;
    paymentMethod: string;
  }) => {
    const { data } = await api.post<{ verified: boolean }>(
      `/orders/${orderId}/verify-payment`,
      paymentDetails
    );
    return data;
  }
};