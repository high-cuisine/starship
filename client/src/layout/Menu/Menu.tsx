
import cls from './Menu.module.scss';
import helmet from '../../assets/icons/helmet.png';
import arrow from '../../assets/icons/arrow.png';
import fire from '../../assets/icons/fire.png';
import state from '../../assets/icons/state.png';
import walletImage from '../../assets/icons/wallet.png';
import planet from '../../assets/icons/planet.png'
import { Link } from 'react-router-dom';
import { TonConnectButton, useTonWallet } from '@tonconnect/ui-react';

const Menu = () => {

    const wallet = useTonWallet();

  //const addr = useTonAddress();

    return (
        <div className={cls.menu}>
            <Link to={'/'}>
                <div className={cls.item}>
                    <img src={planet}></img>
                    <span>Menu</span>
                </div>
            </Link>
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
            <Link to={'/state'}>
                <div className={cls.item}>
                    <img src={state}></img>
                    <span>Stats</span>
                </div>
            </Link>
                    <div className={`${cls.item} ${cls.walletItem}`}>
                    <img src={walletImage}></img>
                    <span>Wallet</span>
                    <div className={cls.modal}>
                        <TonConnectButton className={`${wallet ? cls.active : cls.disactive}`} />
                    </div>
                </div>
            
        </div>
    )
}

export { Menu }