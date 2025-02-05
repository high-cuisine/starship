import cls from './BoostersMenu.module.scss';

interface BoostersMenuProps {
    recharge:number,
    maxRecharge:number
    multitap:number,
    maxMiltitap:number,
}

const BoostersMenu = ({recharge, maxRecharge, multitap, maxMiltitap}:BoostersMenuProps) => {

    return (
        <div className={cls.menu}>
            <span className={cls.title}>Your dailly boosters:</span>
            <div className={cls.buttons}>
                <button className={cls.actionButton}>
                    <span className={cls.info}>Fast recharge </span>
                    <span className={cls.count}>{recharge}/{maxRecharge}</span>
                </button>
                <button className={cls.actionButton}>
                    <span className={cls.info}>Multiply of 3 </span>
                    <span className={cls.count}>{multitap}/{maxMiltitap}</span>
                </button>
            </div>
        </div>
    )
}

export { BoostersMenu }