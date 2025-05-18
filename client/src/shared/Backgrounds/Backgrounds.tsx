
import background1 from '../../assets/backgrounds/background1.png'
import background2 from '../../assets/backgrounds/background2.png'
import background3 from '../../assets/backgrounds/background3.png'
import background4 from '../../assets/backgrounds/background4.png'
import background5 from '../../assets/backgrounds/background5.png'
import background6 from '../../assets/backgrounds/background6.png'
import background7 from '../../assets/backgrounds/background7.png'
import background8 from '../../assets/backgrounds/background8.png'
import background9 from '../../assets/backgrounds/background9.png'

import cls from './Backgrounds.module.scss'

const Backgrounds = () => {


    return (
        <div className={cls.backgrounds}>
            <img src={background1}></img>
            <img src={background2}></img>
            <img src={background3}></img>
            <img src={background4}></img>
            <img src={background5}></img>
            <img src={background6}></img>
            <img src={background7}></img>
            <img src={background8}></img>
            <img src={background9}></img>
        </div>
    )
}

export { Backgrounds }