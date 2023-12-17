import { defineStore } from "pinia";

export interface IUser {
  userId: number;
  headUrl: string;
  nickName: string;
  wpsUserId: number;
}
interface IState {
  user: IUser;
}

export const useUserStore = defineStore("user", {
  state: (): IState => ({
    user: {
      userId: -1,
      headUrl: "https://img.qwps.cn/1511439413?imageMogr2/thumbnail/180x180!&k=1688262745035882173",
      nickName: "test",
      wpsUserId: -1,
    },
  }),
  actions: {
    setUser(user: IUser) {
      this.user = user;
    },
  },
});
