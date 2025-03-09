import cls from './BoostList.module.scss';
import { IBoost } from '../entites/entites';
import { BoostersItem } from '../BoostersItem/BoostersItem';

interface BoostListProps {
    list: IBoost[]
}

const BoostList = ({list}:BoostListProps) => {

    return( 
        <>
            <div className={cls.list}>
                {
                    list.map(el => {
                        return <BoostersItem item={el}></BoostersItem>
                    }) 
                }
            </div>
        </>
    )
}

export { BoostList }