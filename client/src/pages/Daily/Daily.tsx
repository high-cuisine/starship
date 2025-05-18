import { useEffect, useState } from 'react';
import { DailyList } from './components/DailyList/DailyList';
import { Header } from './components/Header/Header';
import cls from './Daily.module.scss';
import { IDaily } from './model/IDaily';
import { useUserStore } from '../../features/store/useUserStore';

const Daily = () => {

    const [list, setList] = useState<IDaily[]>([
        {
            day:1,
            reward:500,
            isActive:false,
        },
        {
            day:2,
            reward:1000,
            isActive:false,
        },
        {
            day:3,
            reward:2500,
            isActive:false,
        },
        {
            day:4,
            reward:5000,
            isActive:false,
        },
        {
            day:5,
            reward:15000,
            isActive:false,
        },
        {
            day:6,
            reward:25000,
            isActive:false,
        },
        {
            day:7,
            reward:10000,
            isActive:false,
        },
        {
            day:8,
            reward:500000,
            isActive:false,
        },
        {
            day:9,
            reward:10000000,
            isActive:false,
        },
        {
            day:10,
            reward:50000000,
            isActive:false,
        },
        
    ]);

    const user = useUserStore(state => state.user)

    useEffect(() => {
        const day:number = Math.min(10, Number(user?.daysActive) - 1);
        const listNew = list
        if(day < 0) return;
        listNew[day] = {
            ...list[day],
            isActive:true
        }

        setList(listNew);
    }, [user])

    return (
        <div className={cls.main}>
            <Header></Header>
            <DailyList list={list}></DailyList>
        </div>
    )
}

export { Daily }