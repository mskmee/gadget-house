import { userService } from '@/utils/packages/user';
import { createAsyncThunk } from '@reduxjs/toolkit';


const getData = createAsyncThunk(
  'user/fetchData',
  async () => {
    return await userService.getData();
  },
);

export { getData };
