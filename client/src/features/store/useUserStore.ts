import { create } from 'zustand';
import { IUser } from '../../entities/IUser/IUser';
import { getLanguageInfo } from '../../utils/getLeguageInfo';

interface UserStore {
  user: IUser | null;
  level: number;
  setUser: (user: IUser) => void;
  setInviteLink: (inviteLink: string) => void;
  getCoins: () => number;
  incrementCoin: () => void;
  updateCoins: (delta: number) => void;
  setCoin: (coin: number) => void;
  setLevel: (level:number) => void;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  level: 0,

  setUser: (userVal: IUser) => set(() => ({
    user: userVal,
    level: getLanguageInfo(userVal.coins).level,
  })),

  setInviteLink: (inviteLink: string) =>
    set((state) => {
      if (!state.user) return {};
      return { user: { ...state.user, inviteLink } };
    }),

  getCoins: () => get().user?.coins ?? 0,

  incrementCoin: () =>
    set((state) => {
      if (!state.user) return {};
      const newCoins = Number(state.user.coins || 0) + 1;
      return { user: { ...state.user, coins: newCoins } };
    }),

  updateCoins: (delta: number) =>
    set((state) => {
      if (!state.user) return {};
      const newCoins = Number(state.user.coins || 0) + delta;
      return { user: { ...state.user, coins: newCoins } };
    }),

  setCoin: (coin: number) =>
    set((state) => {
      if (!state.user) return {};

      const currentCoins = get().getCoins();
      const currentLevel = getLanguageInfo(currentCoins).level;
      const newState = { user: { ...state.user, coins: coin } };

      const newLevel = getLanguageInfo(coin).level;
      if (newLevel > currentLevel) {
        return {
          ...newState,
          level: newLevel,
        };
      }
      return newState;
    }),
    setLevel: (level:number) => set({level}),
}));

export { useUserStore };
