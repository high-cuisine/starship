import { ILeguage } from '../../model/IPlanet';
import { LeguageItem } from '../PlanetItem/PlanetItem';
import cls from './PlanetList.module.scss';

interface LeguageListProps {
    list:ILeguage[]
}

const LeguageList = ({list}:LeguageListProps) => {

    return (
        <div className={cls.list}>
            {
                list.map((el, index) => {
                    return (
                        <LeguageItem key={el.name} item={el} index={index + 1}></LeguageItem>
                    )
                })
            }
        </div>
    )
}

export { LeguageList}