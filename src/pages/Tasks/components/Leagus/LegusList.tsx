import { ITask } from '../../../../entities/ITask/ITask';
import { TaskItem } from '../../../../shared/TaskItem/TaskItem';
import cls from './LegusList.module.scss';

interface LegusListProps {
    list: ITask[]
}

const LegusList = ({list}:LegusListProps) => {

    return (
        <div className={cls.list}>
            {
                list.map((el) => {
                    return (<TaskItem item={el}/>)
                })
            }
        </div>
    )
}

export { LegusList }