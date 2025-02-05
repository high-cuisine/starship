import { ITask } from '../../entities/ITask/ITask';
import cls from './TaskItem.module.scss';
import coin from '../../assets/icons/coin.png'
import { Link } from 'react-router-dom';
import { ProgressLine } from '../ProgressLine/ProgressLine';
import { useRef } from 'react';
import { getLanguageInfo } from '../../utils/getLeguageInfo';

interface LeagusItemProps {
    item: ITask
}

const TaskItem = ({item}:LeagusItemProps) => {

    const lineArr = useRef(null);

    const dataUser = getLanguageInfo(item.count);

    return (
        <div className={cls.card}>
        
                <div className={cls.upContainer}>
                    <div className={cls.leftCotainer}>
                        <div className={cls.icon}>
                            <img src={item.image}></img>
                        </div>
                        <div className={cls.taskInfo}>
                            <span>{item.header}</span>
                            <span className={cls.coinContainer}><img src={coin}></img>{item.count}</span>
                        </div>
                    </div>

                    <div className={cls.rightContainer}>
                        <Link to={item.link}>
                            <button className={cls.button}>Claim</button>
                        </Link> 
                    </div>
                </div>

                <div className={cls.downContainer}>
                    <ProgressLine lineArr={lineArr} coin={item.count} maxCount={(dataUser.maxCount * 100) - 4}></ProgressLine>
                </div>
    
        </div>
    )
}

export { TaskItem }