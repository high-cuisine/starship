import { useRef } from 'react';
import { getLanguageInfo } from '../../../../utils/getLeguageInfo';
import { IRefferal } from '../../model/iRefferal';
import cls from './RefferalItem.module.scss';
import coin from '../../../../assets/images/coin.png'
import { ProgressLine } from '../../../../shared/ProgressLine/ProgressLine';

interface RefferalItemProps {
    item:IRefferal
}

const RefferalItem = ({item}:RefferalItemProps) => {

    const dataUser = getLanguageInfo(item.coin);
    const lineArr = useRef(null);

    return (
        <div className={cls.user}>
            <div className={cls.card}>
                <img src={dataUser.image}></img>
                <div className={cls.level}>
                    {dataUser.name}
                    <span className={cls.coinContainer}>
                        <img src={coin}></img>
                        {item.coin}
                    </span>
                </div>
                <div className={cls.name}>
                    {item.name}
                </div>
            </div>

            <ProgressLine lineArr={lineArr} coin={item.coin} maxCount={(dataUser.maxCount * 100) - 4}></ProgressLine>
        </div>
    )
}

export { RefferalItem }