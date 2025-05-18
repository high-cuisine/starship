import { TonConnectButton, useTonWallet, useTonAddress } from '@tonconnect/ui-react';
import cls from './Wallet.module.scss';

function WalletComponent() {
  const wallet = useTonWallet();

  const addr = useTonAddress();
  console.log("ADDRESS: ", addr);


  return (
    <div className={cls.modal}>
      {wallet ? (
        <div className={cls.connected}>
          <p className={cls.walletAddress}>
            {addr.slice(0, 3) + '...' + addr.slice(-3)}
            <img className={cls.arrow} src='./assets/icons/walletArrow.png'></img>
          </p>
        </div>
      )
    :
    <div className={cls.walletConnect}>Connect</div>
    }
        <TonConnectButton className={`${wallet ? cls.active : cls.disactive}`} />
      
    </div>
  );
}

export default WalletComponent;
