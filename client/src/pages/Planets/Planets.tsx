import { LeguageList } from './components/PlanetList/PlanetList';
import cls from './Planets.module.scss';
import { languages } from '../../utils/getLeguageInfo';

const PLanets = () => {    

    return (
        <div className={cls.main}>
            <LeguageList list={languages}></LeguageList>
        </div>
    )
}

export { PLanets }