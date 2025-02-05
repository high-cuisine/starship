import cls from './DailyItem.module.scss'

interface DailyItemProps {
    reward:number,
    day:number
}

const DailyItem = ({reward, day}:DailyItemProps) => {

    return (
        <div className={cls.card}>
            {reward}
            <img></img>
            day {day}
        </div>
    )
}

export { DailyItem }