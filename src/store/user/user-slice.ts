import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import { DataStatus } from '@/enums/data-status';
import { getData } from './actions';
import { UserResponseDto } from '@/utils/packages/user/libs/types/types';

export interface IUserState {
  user: UserResponseDto | null;
  dataStatus: DataStatus;
}

const initialState: IUserState = {
  user: null,
  dataStatus: DataStatus.IDLE,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getData.fulfilled, (state, { payload }) => {
      state.user = payload;
    });

    builder.addMatcher(
      isAnyOf(getData.fulfilled),
      (state) => {
        state.dataStatus = DataStatus.FULFILLED;
      },
    );
    builder.addMatcher(
      isAnyOf(getData.rejected),
      (state) => {
        state.dataStatus = DataStatus.REJECT;
      },
    );
    builder.addMatcher(
      isAnyOf(getData.pending),
      (state) => {
        state.dataStatus = DataStatus.PENDING;
      },
    );
  },
});

export const { actions, reducer } = userSlice;
