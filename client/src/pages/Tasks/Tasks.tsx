
import { useState } from 'react';
import { Balance } from '../../shared/Balance/Balance';
import cls from './Tasks.module.scss';
import { NavBar } from './components/NavBar/NavBar';
import { ITask } from '../../entities/ITask/ITask';
import { LegusList } from './components/Leagus/LegusList';
import helmet from '../../assets/icons/helmet.png'

const Tasks = () => {

    const [currentTask, setCurrentTask] = useState<'Ref' | 'Spesial' | 'Leagus'>('Ref');

    const tasks: ITask[] = [
        {
            image: helmet,
            header: "Задача 1",
            count: 10,
            link: "https://example.com/tasks/1"
        },
        {
            image: helmet,
            header: "Задача 2",
            count: 5,
            link: "https://example.com/tasks/2"
        },
        {
            image: helmet,
            header: "Задача 3",
            count: 8,
            link: "https://example.com/tasks/3"
        }
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
            <Balance isSubTitle={false} balance={10000} isLeaguageShow={true}></Balance>
            <NavBar state={currentTask} setState={setCurrentTask}></NavBar>
            <LegusList list={getTasks()}></LegusList>
        </div>
    )
}

export { Tasks }