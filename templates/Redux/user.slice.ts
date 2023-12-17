import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import type {IUser} from "@/types";
interface IUser {}
interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    initUserInfo: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
  },
});

export const { initUserInfo } = userSlice.actions;
export default userSlice.reducer;
