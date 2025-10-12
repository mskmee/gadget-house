import { createAsyncThunk } from '@reduxjs/toolkit';
import { ordersService } from '@/utils/packages/orders';

const getAllOrders = createAsyncThunk('orders/fetch', async () => {
  return await ordersService.getAllOrders();
});

const getOneOrderById = createAsyncThunk(
  'orders/fetchOne',
  async (id: string) => {
    return await ordersService.getOneOrderById(id);
  },
);

const deleteOrder = createAsyncThunk('orders/delete', async (id: string) => {
  return await ordersService.deleteOrder(id);
});

const patchOrder = createAsyncThunk(
  'orders/patch',
  async ({ id, status }: { id: string; status: string }) => {
    return await ordersService.patchOrder(id, status);
  },
);

export const patchMultipleOrders = createAsyncThunk(
  'orders/patchMultiple',
  async ({ ids, status }: { ids: string[]; status: string }) => {
    const results = await Promise.all(
      ids.map((id) => ordersService.patchOrder(id, status)),
    );

    return results;
  },
);

export { getAllOrders, getOneOrderById, deleteOrder, patchOrder };
