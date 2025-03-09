import mars from '../assets/images/planets/mars.png';
import jupiter from '../assets/images/planets/jupiter.png';
import saturn from '../assets/images/planets/saturn.png';
import uranus from '../assets/images/planets/uranus.png';
import neptune from '../assets/images/planets/Neptun.png';
import pluto from '../assets/images/planets/pluto.png';
import sun from '../assets/images/planets/sun.png';
import infinity from '../assets/images/planets/infinity.png';
import mercuriy from '../assets/images/planets/mercuriy.png';
import Venus from '../assets/images/planets/Venus.png';
import Earth from '../assets/images/planets/earth.png';

export const languages = [
    {
        image: infinity,
        name: "",
        minCount: 0,
        maxCount:25000000,
        purchase: 1,
        multiplier: 1,
        level: 1,
    },
    {
        image: mercuriy,
        name: "Mercury",
        minCount: 25000000,
        maxCount: 58000000,
        purchase: 0.5,
        multiplier: 5,
        level: 2,
    },
    {
        image: Venus,
        name: "Venus",
        minCount: 58000000,
        maxCount: 1080000000,
        purchase: 0.10,
        multiplier: 10,
        level: 3
    },
    {
        image: Earth,
        name: "Earth",
        minCount: 1080000000,
        maxCount: 149000000,
        purchase: 0.15,
        multiplier: 15,
        level: 4
    },
    {
        image: mars,
        name: "Mars",
        minCount: 149000000,
        maxCount: 228000000,
        purchase: 0.20,
        multiplier: 25,
        level: 5
    },
    {
        image: jupiter,
        name: "Jupiter",
        minCount: 228000000,
        maxCount: 778000000,
        purchase: 0.25,
        multiplier: 25,
        level: 6
    },
    {
        image: saturn,
        name: "Saturn",
        minCount: 778000000,
        maxCount: 1430000000,
        purchase: 0.30,
        multiplier: 30,
        level: 7
    },
    {
        image: uranus,
        name: "Uranus",
        minCount: 1430000000,
        maxCount: 2800000000,
        purchase: 0.35,
        multiplier: 35,
        level: 8
    },
    {
        image: neptune,
        name: "Neptune",
        minCount: 2800000000,
        maxCount: 4500000000,
        purchase: 0.40,
        multiplier: 40,
        level: 9
    },
    {
        image: pluto,
        name: "Pluto",
        minCount: 4500000000,
        maxCount: 5800000000,
        purchase: 0.45,
        multiplier: 45,
        level: 10
    },
    {
        image: sun,
        name: "Sun",
        minCount: 5800000000,
        maxCount: 7000000000,
        purchase: 0.50,
        multiplier: 50,
        level: 11
    }
];

interface LanguageInfo {
    image: string,
    name: string,
    minCount: number,
    maxCount: number,
    purchase: number,
    multiplier: number,
    level:number
}

export function getLanguageInfo(score: number): LanguageInfo {
    for (let i = 0; i < languages.length; i++) {
      if (score >= languages[i].minCount && score < languages[i].maxCount) {
        return languages[i];
      }
    }
    return { ...languages[languages.length - 1], maxCount: Infinity };
  }
