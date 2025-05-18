import cls from './DailyItem.module.scss'
import coin from '../../../../assets/icons/coin.png'
import { formatedNumber } from '../../../../utils/formatedNumberShort'
import { useUserStore } from '../../../../features/store/useUserStore'
import { useNavigate } from 'react-router-dom';

interface DailyItemProps {
    reward:number,
    day:number,
    isActive:boolean
}

const DailyItem = ({reward, day, isActive}:DailyItemProps) => {

    const setDailyBonus = useUserStore(state => state.useDailyBonus);
    const navigate = useNavigate();

    const handleTakeDaily = () => {
        if(!isActive) return;

        setDailyBonus(reward).then(() => navigate('/'));
        
    }

    return (
        <div className={`${cls.card} ${isActive && cls.active}`}
            onClick={() => handleTakeDaily() }
        >
            <span className={cls.title}>{formatedNumber(reward)}</span>
            <img src={coin}></img>
            <span className={cls.subTitle}>day {day}</span>
        </div>
    )
}

export { DailyItem }