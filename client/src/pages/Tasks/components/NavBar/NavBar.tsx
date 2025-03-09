import cls from './NavBar.module.scss';

interface NavBarProps {
    state: 'Ref' | 'Spesial' | 'Leagus';
    setState: (value:'Ref' | 'Spesial' | 'Leagus') => void
}

const NavBar = ({state, setState}:NavBarProps) => {

    return (
        <div className={cls.nav}>
            <div 
                className={`${cls.button} ${state === 'Spesial' && cls.active}`}
                onClick={() => setState('Spesial')}
            >
                <span>Spesial</span>
            </div>
            <div 
                className={`${cls.button} ${state === 'Leagus' && cls.active}`}
                onClick={() => setState('Leagus')}
            >
                <span>Leagus</span>
            </div>
            <div 
                className={`${cls.button} ${state === 'Ref' && cls.active}`}
                onClick={() => setState('Ref')}
            >
                <span>Ref Tasks</span>
            </div>
        </div>
    )
}

export { NavBar }