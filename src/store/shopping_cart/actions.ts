import { createAsyncThunk } from '@reduxjs/toolkit';

import { ordersService } from '@/utils/packages/orders/';
import { OrderDto, OrderResponseDto } from '@/utils/packages/orders/libs/types/order-item';

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (orderData: OrderDto, thunkAPI) => {
    try {
      return await ordersService.createOrder(orderData) as OrderResponseDto;
    } catch (error: any) {
      const errorMessage = error.response?.message || error.message || 'Something went wrong';

      return thunkAPI.rejectWithValue(errorMessage);
    }
  }
);
