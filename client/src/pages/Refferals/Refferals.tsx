import { useEffect, useState } from 'react';
import { useUserStore } from '../../features/store/useUserStore';
import { Header } from './components/Header/Header';
import { RefferalList } from './components/RefferalsList/RefferalsList';
import { IRefferal } from './model/iRefferal';
import cls from './Refferals.module.scss';
import RefferalService from './api/RefferalService';
import { getLanguageInfo } from '../../utils/getLeguageInfo';

const Refferals = () => {

    const [referrals, setRefferals] = useState<IRefferal[]>([])

    useEffect(() => {
        async function fetchRef() {
            const res = await RefferalService.getRefferals();
            
            setRefferals(res.map(el => {
                const leage = getLanguageInfo(el.referred.scores)
                return {
                    id: el.id,
                    level: leage.level,
                    name: el.referred.username,
                    coin: el.referred.scores,
                    progress: el.referred.scores / leage.maxCount
                }
            }))
        }

        fetchRef()
    }, [])

    const user = useUserStore(state => state.user); 
    
    return (
        <div className={cls.main}>
            <Header link={String(user?.telegramId)}></Header>
            <RefferalList list={referrals}></RefferalList>
        </div>
    )
}

export { Refferals }