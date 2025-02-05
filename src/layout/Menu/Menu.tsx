
import cls from './Menu.module.scss';
import helmet from '../../assets/icons/helmet.png';
import arrow from '../../assets/icons/arrow.png';
import fire from '../../assets/icons/fire.png';
import state from '../../assets/icons/state.png';
import wallet from '../../assets/icons/wallet.png';
import { Link } from 'react-router-dom';

const Menu = () => {

    return (
        <div className={cls.menu}>
            <Link to={'/ref'}>
                <div className={cls.item}>
                    <img src={helmet}></img>
                    <span>Ref</span>
                </div>
            </Link>
            <Link to={'/task'}>
                <div className={cls.item}>
                    <img src={arrow}></img>
                    <span>Task</span>
                </div>
            </Link>
            <Link to={'/boost'}>
                <div className={cls.item}>
                    <img src={fire}></img>
                    <span>Boost</span>
                </div>
            </Link>
            <Link to={'/'}>
                <div className={cls.item}>
                    <img src={state}></img>
                    <span>Stats</span>
                </div>
            </Link>
            <Link to={'/wallet'}>
                <div className={cls.item}>
                    <img src={wallet}></img>
                    <span>Wallet</span>
                </div>
            </Link>
        </div>
    )
}

export { Menu }