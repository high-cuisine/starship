import ship1 from '../../assets/images/ships/ship1.png';
import ship2 from '../../assets/images/ships/ship2.png';
import ship3 from '../../assets/images/ships/ship3.png';
import ship4 from '../../assets/images/ships/ship4.png';
import ship5 from '../../assets/images/ships/ship5.png';
import ship6 from '../../assets/images/ships/ship6.png';
import ship7 from '../../assets/images/ships/ship7.png';
import ship8 from '../../assets/images/ships/ship8.png';
import ship9 from '../../assets/images/ships/ship9.png';
//import ship10 from '../../assets/images/ships/ship10.png';

const background1 = './backgrounds/background1.png';
const background2 = './backgrounds/background2.png';
const background3 = '.backgrounds/background3.png';
const background4 = './backgrounds/background4.png';
const background5 = './backgrounds/background5.png';
const background6 = './backgrounds/background6.png';
const background7 = './backgrounds/background7.png';
const background8 = './backgrounds/background8.png';
const background9 = './backgrounds/background9.png';
const background10 = './backgrounds/background10.png';


import bulletElectro1 from '../../assets/images/bullets/electro-1.png';
import bulletElectro2 from '../../assets/images/bullets/electro-2.png';
import bulletFire1 from '../../assets/images/bullets/fire-1.png';
import bulletFire2 from '../../assets/images/bullets/fire-2.png';
import bulletFire from '../../assets/images/bullets/fire.png';
import bulletLz1 from '../../assets/images/bullets/lz-1.png';
import bulletLz2 from '../../assets/images/bullets/lz-2.png';
import bulletLz3 from '../../assets/images/bullets/lz-3.png';
import bulletPlz2 from '../../assets/images/bullets/plz-2.png';
import bulletPlz1 from '../../assets/images/bullets/plz-1.png';
// import bulletPlz3 from '../../assets/images/bullets/plz-3.png';
// import bulletPlz4 from '../../assets/images/bullets/plz-4.png';
// import bulletRk1 from '../../assets/images/bullets/rk-1.png';
// import bulletRk2 from '../../assets/images/bullets/rk-2.png';
// import bulletRk3 from '../../assets/images/bullets/rk-3.png';
// import bulletRk4 from '../../assets/images/bullets/rk-4.png';
// import bulletRk5 from '../../assets/images/bullets/rk-5.png';


interface LevelData {
  playerImage: string;
  backgroundImage: string;
  bulletType: string;
}
type UseGameCustomProps = {
  level: number;
};

const useGameCustom = ({ level }: UseGameCustomProps) => {
  const levelData: Record<number, LevelData> = {
    1: { playerImage: ship1, backgroundImage: background1, bulletType: bulletElectro1, },
    2: { playerImage: ship2, backgroundImage: background2, bulletType: bulletElectro2 },
    3: { playerImage: ship3, backgroundImage: background3, bulletType: bulletFire },
    4: { playerImage: ship4, backgroundImage: background4, bulletType: bulletFire1 },
    5: { playerImage: ship5, backgroundImage: background5, bulletType: bulletFire2 },
    6: { playerImage: ship6, backgroundImage: background6, bulletType: bulletLz1 },
    7: { playerImage: ship7, backgroundImage: background7, bulletType: bulletLz2 },
    8: { playerImage: ship8, backgroundImage: background8, bulletType: bulletLz3 },
    9: { playerImage: ship9, backgroundImage: background9, bulletType: bulletPlz2 },
    10: { playerImage: ship4, backgroundImage: background10, bulletType: bulletPlz1 },
    11: { playerImage: ship1, backgroundImage: background1, bulletType: bulletElectro1, },
  };
  

  if (level < 1 || level > 11) {
    throw new Error(`Недопустимый уровень: ${level}. Уровень должен быть от 1 до 10.`);
  }

  return { ...levelData[level] };
};

export { useGameCustom };
