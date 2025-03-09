
import daily from '../../../../assets/images/daily.png';
import cls from './Header.module.scss';

const Header = () => {

    return (
        <div className={cls.header}>
          <img src={daily}></img>  

          <p>Get a reward for logging into the game every day without passes. The PICKUP button must be pressed daily, otherwise the counter will start again</p>
        </div>
    )
}

export { Header }