
import { useState } from 'react';
import { Balance } from '../../shared/Balance/Balance';
import cls from './Tasks.module.scss';
import { NavBar } from './components/NavBar/NavBar';
import { ITask } from '../../entities/ITask/ITask';
import { LegusList } from './components/Leagus/LegusList';

import { useUserStore } from '../../features/store/useUserStore';

const Tasks = () => {

    const [currentTask, setCurrentTask] = useState<'Ref' | 'Spesial' | 'Leagus'>('Ref');
    const {user} = useUserStore();

    const tasks: ITask[] = [

    ];

    function getTasks() {
        switch(currentTask) {
            case 'Ref':
                return tasks
            case 'Leagus':
                return tasks
            case 'Spesial':
                return tasks
        }   
    }

    return (
        <div className={cls.main}>
            <Balance isSubTitle={false} balance={Number(user?.scores)} isLeaguageShow={true}></Balance>
            <NavBar state={currentTask} setState={setCurrentTask}></NavBar>
            <LegusList list={getTasks()}></LegusList>
        </div>
    )
}

export { Tasks }