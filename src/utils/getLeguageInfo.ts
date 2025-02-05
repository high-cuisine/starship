import mars from '../assets/images/planets/mars.png';
import jupiter from '../assets/images/planets/jupiter.png';
import saturn from '../assets/images/planets/saturn.png';
import uranus from '../assets/images/planets/uranus.png';
import neptune from '../assets/images/planets/Neptun.png';
import pluto from '../assets/images/planets/pluto.png';
import sun from '../assets/images/planets/sun.png';

export const languages = [
    {
        image: mars,
        name: "Mars",
        minCount: 228000000,
        purchase: 0.20,
        multiplier: 25
    },
    {
        image: jupiter,
        name: "Jupiter",
        minCount: 778000000,
        purchase: 0.25,
        multiplier: 25
    },
    {
        image: saturn,
        name: "Saturn",
        minCount: 1430000000,
        purchase: 0.30,
        multiplier: 30
    },
    {
        image: uranus,
        name: "Uranus",
        minCount: 2800000000,
        purchase: 0.35,
        multiplier: 35
    },
    {
        image: neptune,
        name: "Neptune",
        minCount: 4500000000,
        purchase: 0.40,
        multiplier: 40
    },
    {
        image: pluto,
        name: "Pluto",
        minCount: 5800000000,
        purchase: 0.45,
        multiplier: 45
    },
    {
        image: sun,
        name: "Sun",
        minCount: 7000000000,
        purchase: 0.50,
        multiplier: 50
    }
];

interface LanguageInfo {
    image: string,
    name: string,
    maxCount: number,
    purchase: number,
    multiplier: number
}

export function getLanguageInfo(scores: number): LanguageInfo {
    for (let i = 0; i < languages.length; i++) {
        if (scores < languages[i].minCount) {
            return {
                image: languages[i].image,
                name: languages[i].name,
                maxCount: i + 1 < languages.length ? languages[i + 1].minCount : Infinity,
                purchase: languages[i].purchase,
                multiplier: languages[i].multiplier
            };
        }
    }
    return {...languages[languages.length - 1], maxCount: Infinity};
}

