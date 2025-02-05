import cls from './Balance.module.scss';
import coin from '../../assets/images/coin.png';
import { formatedNumber } from '../../utils/formatedNumberShort';
import { getLanguageInfo } from '../../utils/getLeguageInfo';
import { Link } from 'react-router-dom';

interface BalanceProps {
    isSubTitle:boolean,
    balance:number,
    isLeaguageShow:boolean,
}

const Balance = ({isSubTitle, balance, isLeaguageShow}:BalanceProps) => {

    const userData = getLanguageInfo(balance);

    return (
        <div className={cls.balance}>
            {isSubTitle && <p className={cls.subTitle}>Your Share balance</p>}
            <span className={cls.title}>
                <img src={coin}></img>
                <span>{formatedNumber(balance)}</span>
            </span>
            {
                isLeaguageShow &&
                <Link to={'/'}>
                    <div className={cls.planet}>
                        <img src={userData.image}></img>
                        <span>{userData.name}</span>
                        <svg width="37" height="36" viewBox="0 0 37 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.5 10L22.5 18L14.5 26" stroke="#9FBACC" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </div>
                </Link>
            }
        </div>
    )
}

export { Balance }