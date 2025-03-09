import { IDaily } from '../../model/IDaily';
import { DailyItem } from '../DailyItem/DailyItem';
import cls from './DailyList.module.scss';

interface DailyListProps {
    list: IDaily[]
}

const DailyList = ({list}:DailyListProps) => {

    return (
        <div className={cls.list}>
            {
                list.map((el) => {
                    return <DailyItem 
                            day={el.day} 
                            reward={el.reward} 
                            isActive={el.isActive}
                            ></DailyItem>
                })
            }
        </div>
    )
}

export { DailyList }