import { Balance } from '../../shared/Balance/Balance';
import cls from './Boost.module.scss';
import { BoostersMenu } from './components/BoostersMenu/BoostersMenu';
import { BoostList } from './components/BoostList/BoostList';
import multitap from '../../assets/images/boost/multitap.png'
import fire from '../../assets/images/boost/fire.png'

const Boost = () => {

    const boosts = [
        {
            image: multitap,
            name: "Multitap ",
            prise: 50000,
            level: 1,
            setBonus: () => {
                console.log("Speed increased!");
            }
        },
        {
            image: fire,
            name: "Fast speed",
            prise: 50000,
            level: 1,
            setBonus: () => {
                console.log("Power increased!");
            }
        },
    ];

    return (
        <div className={cls.main}>
            <Balance
                isLeaguageShow={true}
                isSubTitle={false}
                balance={22501000}
            ></Balance>
            <BoostersMenu
                recharge={3}
                maxRecharge={3}
                multitap={3}
                maxMiltitap={3}
            ></BoostersMenu>
            <BoostList
                list={boosts}
            ></BoostList>
        </div>
    )
}

export { Boost }