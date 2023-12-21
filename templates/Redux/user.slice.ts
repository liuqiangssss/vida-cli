import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import type {IUser} from "@/types";
interface IUser {
  name: string;
}

const initialState: IUser = {
  name: "",
};

export const userSlice = createSlice({
  name: "user",
  // `createSlice` 将从 `initialState` 参数推断 state 类型
  initialState,
  reducers: {
    initUserInfo: (state: IUser, action: PayloadAction<IUser>) => {
      state = action.payload;
    },
  },
});

export const { initUserInfo } = userSlice.actions;
export default userSlice.reducer;
