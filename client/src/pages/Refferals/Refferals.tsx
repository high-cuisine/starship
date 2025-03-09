import { useUserStore } from '../../features/store/useUserStore';
import { Header } from './components/Header/Header';
import { RefferalList } from './components/RefferalsList/RefferalsList';
import { IRefferal } from './model/iRefferal';
import cls from './Refferals.module.scss';

const Refferals = () => {

    const referrals: IRefferal[] = [
        { level: 1, name: "Alice", coin: 50, progress: 80 },
        { level: 2, name: "Bob", coin: 30, progress: 60 },
        { level: 3, name: "Charlie", coin: 20, progress: 40 },
        { level: 1, name: "David", coin: 70, progress: 90 },
        { level: 2, name: "Eve", coin: 40, progress: 50 },
        { level: 3, name: "Frank", coin: 25, progress: 35 },
        { level: 1, name: "Grace", coin: 55, progress: 85 },
        { level: 2, name: "Hank", coin: 33, progress: 65 },
        { level: 3, name: "Ivy", coin: 22, progress: 45 }
    ];

    const user = useUserStore(state => state.user); 
    
    return (
        <div className={cls.main}>
            <Header link={String(user?.inviteLink)}></Header>
            <RefferalList list={referrals}></RefferalList>
        </div>
    )
}

export { Refferals }