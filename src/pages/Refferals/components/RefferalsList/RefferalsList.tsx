import { IRefferal } from '../../model/iRefferal';
import { RefferalItem } from '../RefferalItem/RefferalItem';
import cls from './RefferalsList.module.scss';

interface RefferalsListProps {
    list:IRefferal[]
}

const RefferalList = ({list}:RefferalsListProps) => {

    return (
        <div className={cls.body}>
            <span className={cls.title}>My Referrals:</span>
            <div className={cls.list}>
                {
                    list.map((el) => {
                        return <RefferalItem item={el}></RefferalItem>
                    })
                }
            </div>
        </div>
    )
}

export { RefferalList }