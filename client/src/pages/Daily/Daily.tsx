import { DailyList } from './components/DailyList/DailyList';
import { Header } from './components/Header/Header';
import cls from './Daily.module.scss';
import { IDaily } from './model/IDaily';

const Daily = () => {

    const list:IDaily[] = [
        {
            day:1,
            reward:500,
            isActive:true,
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
        
    ]
    return (
        <div className={cls.main}>
            <Header></Header>
            <DailyList list={list}></DailyList>
        </div>
    )
}

export { Daily }