import { useGameStore } from '../../../../features/store/useGameStore';
import cls from './BoostersMenu.module.scss';

interface BoostersMenuProps {
    maxRecharge:number,
    maxMiltitap:number,
}

const BoostersMenu = ({maxRecharge, maxMiltitap}:BoostersMenuProps) => {

    const state = useGameStore();
    return (
        <div className={cls.menu}>
            <span className={cls.title}>Your dailly boosters:</span>
            <div className={cls.buttons}>
                <button className={cls.actionButton}
                    onClick={state.useDailyRecharge}
                >
                    <span className={cls.info}>Fast recharge </span>
                    <span className={cls.count}>{state.dailyRecharge.count}/{maxRecharge}</span>
                </button>
                <button className={cls.actionButton}
                    onClick={state.useDailyMultiplay}
                >
                    <span className={cls.info}>Multiply of 3 </span>
                    <span className={cls.count}>{state.dailyMultiPlay.count}/{maxMiltitap}</span>
                </button>
            </div>
        </div>
    )
}

export { BoostersMenu }