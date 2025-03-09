import cls from './ProgressLine.module.scss';

interface ProgressLineProps {
    lineArr: React.RefObject<HTMLDivElement>,
    coin: number,
    maxCount: number
}

const ProgressLine = ({ lineArr, coin, maxCount }: ProgressLineProps) => {
    const widthPercentage = Math.min(Math.max(Math.floor(coin / maxCount * 100) - 4, 0), 100);

    return (
        <div className={cls.line} ref={lineArr}>
            <div className={cls.activeLine} style={{ width: `${widthPercentage}%` }}></div>
        </div>
    )
}

export { ProgressLine }