import { create } from 'zustand';

interface GameStore {
    rechargeLevel: number,
    multiplyLevel: number,
    countRecharge: number,
    countMultiply: number,

    dailyMultiPlay: { count: number, date: Date, status: 'active' | 'disable' },
    dailyRecharge: { count: number, date: Date, status: 'active' | 'disable' },

    setRechargeLevel: (rechargeLevel: number) => void,
    setMultiplyLevel: (multiplyLevel: number) => void,

    setCountRecharge: (countRecharge: number) => void,
    setCountMultiply: (countMultiply: number) => void,

    useDailyMultiplay: () => void,
    useDailyRecharge: () => void,

    disableDaily: () => void,
}

const useGameStore = create<GameStore>((set, get) => ({
    rechargeLevel: 1,
    multiplyLevel: 1,
    countRecharge: 3,
    countMultiply: 3,
    dailyMultiPlay: { count: 3, date: new Date(0), status: 'disable' },
    dailyRecharge: { count: 3, date: new Date(0), status: 'disable' },

    useDailyMultiplay: () => {
        if (get().dailyMultiPlay.status === 'active') return;

        const lastTime = get().dailyMultiPlay.date;
        const timeDiff = (Date.now() - Number(lastTime)) / 1000 / 86400;

        if (timeDiff > 1) {
            set(() => ({
                dailyMultiPlay: { count: 2, date: new Date(), status: 'active' },
                multiplyLevel: get().multiplyLevel + 1
            }));
            return;
        }

        if (get().dailyMultiPlay.count > 0) {
            
            set((state) => ({
                dailyMultiPlay: {
                    count: state.dailyMultiPlay.count - 1,
                    date: state.dailyMultiPlay.date,
                    status: 'active'
                },
                multiplyLevel: state.multiplyLevel + 1
            }));
        }
    },

    useDailyRecharge: () => {
        if (get().dailyRecharge.status === 'active') return;

        const lastTime = get().dailyRecharge.date;
        const timeDiff = (Date.now() - Number(lastTime)) / 1000 / 86400;

        
        if (timeDiff > 1) {
            set(() => ({
                dailyRecharge: { count: 2, date: new Date(), status: 'active' },
                rechargeLevel: get().rechargeLevel + 1
            }));
            return;
        }

        if (get().dailyRecharge.count > 0) {
            set((state) => ({
                dailyRecharge: {
                    count: state.dailyRecharge.count - 1,
                    date: state.dailyRecharge.date,
                    status: 'active'
                },
                rechargeLevel: state.rechargeLevel + 1
            }));
        }
    },

    setRechargeLevel: (rechargeLevel: number) => set({ rechargeLevel }),
    setMultiplyLevel: (multiplyLevel: number) => set({ multiplyLevel }),
    setCountRecharge: (countRecharge: number) => set({ countRecharge }),
    setCountMultiply: (countMultiply: number) => set({ countMultiply }),

    disableDaily: () => {
        set((state) => ({
            dailyMultiPlay: { ...state.dailyMultiPlay, status: 'disable' },
            dailyRecharge: { ...state.dailyRecharge, status: 'disable' },

            multiplyLevel: Math.max(1, state.multiplyLevel - 1),
            rechargeLevel: Math.max(1, state.rechargeLevel - 1),
        }));
    }
}));

export { useGameStore };
