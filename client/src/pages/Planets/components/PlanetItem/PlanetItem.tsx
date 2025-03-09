import { ILeguage } from '../../model/IPlanet';
import cls from './PlanetItem.module.scss';
import coin from '../../../../assets/icons/coin.png';
import { formatedNumber } from '../../../../utils/formatedNumber';
import { useNavigate  } from 'react-router-dom';
import { useUserStore } from '../../../../features/store/useUserStore';

interface LeguageItemProps {
    item:ILeguage,
    index:number
}

const LeguageItem = ({item, index}:LeguageItemProps) => {

    const navigate = useNavigate();
    const user = useUserStore(state => state.user);
    const setLevel = useUserStore(state => state.setLevel);

    const relocateGame = () => {
        console.log(user?.coins, item.minCount)
        if(Number(user?.coins) > item.minCount) {
            setLevel(index);
            navigate(`/game`, {replace:true});
        }    
    }

    return (
        <div className={cls.item}
            onClick={relocateGame}
        >    
                <div className={cls.upContainer}>
                    <span className={cls.title}>{item.name}</span>
                    <div className={cls.coinsContainer}>
                        <img src={coin}/>
                        <span>{formatedNumber(item.minCount)}</span>
                    </div>
                </div>
                <div className={cls.downContainer}>
                    <div className={cls.leftContainer}>
                        <img className={cls.planetImage} src={item.image}/>
                    </div>

                    <div className={cls.centerContainer}>
                        <svg width="140" height="15" viewBox="0 0 140 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M44.5 7.25781H1H90.5M90.5 7.25781L84 1M90.5 7.25781L84 13.9922" stroke="#DFEBF2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        { item.multiplier > 1 && <span>{item.multiplier}×</span>}
                    </div>

                    <div className={cls.rightContainer}>
                        <span className={cls.numberPurchase}>{item.multiplier > 1 ? item.purchase : 'the'}</span>
                        <span className={cls.purchaseSubtitle}>{item.multiplier > 1 ? 'Purchase' : `${index} level`}</span>
                    </div>
                </div>
        </div>
    )
}

export { LeguageItem }