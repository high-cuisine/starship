import { create } from 'zustand';
import { IUser } from '../../entities/IUser/IUser';
import { getLanguageInfo } from '../../utils/getLeguageInfo';
import UserService from '../api/Services/UserService';
import { jwtDecode } from 'jwt-decode';
import { useGameStore, GameStore } from './useGameStore';

interface UserStore {
  user: IUser | null;
  level: number;
  gameStore: GameStore;
  setUser: (user: IUser) => void;
  setInviteLink: (inviteLink: string) => void;
  getCoins: () => number;
  incrementCoin: (count:number) => void;
  updateCoins: (delta: number) => void;
  setCoin: (coin: number) => void;
  setLevel: (level:number) => void;
  login: (telegramId:number, hash:string) => Promise<void>;
  useDailyBonus: (reward:number) => Promise<void>;
}

const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  level: 0,
  gameStore: useGameStore.getState(),

  setUser: (userVal: IUser) => set(() => ({
    user: userVal,
    level: getLanguageInfo(userVal.scores).level,
  })),

  setInviteLink: (inviteLink: string) =>
    set((state) => {
      if (!state.user) return {};
      return { user: { ...state.user, inviteLink } };
    }),

  getCoins: () => get().user?.scores ?? 0,

  incrementCoin: (count:number) =>
    set((state) => {
      if (!state.user) return {};
      const newCoins = Number(state.user.scores || 0) + count;
      return { user: { ...state.user, scores: newCoins } };
    }),

  updateCoins: (delta: number) =>
    set((state) => {
      if (!state.user) return {};
      const newCoins = Number(state.user.scores || 0) + delta;
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

    login: async (telegramId:number, hash:string) => {
      console.log('work')
      const token = await UserService.login(telegramId, hash);

      console.log(token);

      localStorage.setItem('token', token.accessToken);

      const user = jwtDecode<IUser>(String(token.accessToken));

      console.log(user.dailyMultiply, user.dailyRecharge)

      get().gameStore.setDailyMultiPlay(user.dailyMultiply);
      get().gameStore.setDailyRecharge(user.dailyRecharge);

      console.log(user);
      get().setUser(user);

      
    },

    useDailyBonus:async (reward:number) => {
      
      await UserService.setDailyReward();
      get().updateCoins(reward);


    }
}));

export { useUserStore };
