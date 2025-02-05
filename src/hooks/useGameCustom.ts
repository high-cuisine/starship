import shipFirst from '../assets/images/ships/ship1.png';
import backgroundFirst from '../assets/images/bg.png';

type useGameCustomeProps = {
    level:1
}

const useGameCustome = ({level}:useGameCustomeProps) => {

    const levelData = {
        1: {playerImage:shipFirst, backgroundImage:backgroundFirst, bulletType:'bullet'}
    }

    return {...levelData[level]}
}

export { useGameCustome }