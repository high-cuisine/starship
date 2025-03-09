import { IBoost } from '../entites/entites';
import cls from './BoostersItem.module.scss';
import coin from '../../../../assets/images/coin.png';

interface BoostersItemProps {
    item:IBoost;
}

const BoostersItem = ({item}:BoostersItemProps) => {

    return (
        <div className={cls.item}
        onClick={item.setBonus}
        >
            <img className={cls.icon} src={item.image}></img>

            <div className={cls.name}>
                <span>{item.name}</span>
                <span className={cls.coin}>
                    <img src={coin}></img>
                    <span>{item.prise}</span>
                </span>
            </div>

            <span className={cls.level}>
                {item.level} level
            </span>
        </div>
    )
}

export { BoostersItem }