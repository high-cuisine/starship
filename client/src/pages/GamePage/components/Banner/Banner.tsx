import { useUserStore } from '../../../../features/store/useUserStore';
import cls from './Banner.module.scss';
import coin from '../../../../assets/icons/coin.png'

const Banner = () => {

    const {user} = useUserStore();

    return (
        <div className={cls.banner}>
            <img src={coin}></img>
            <span>{user?.scores}</span>
        </div>
    )
}

export { Banner };