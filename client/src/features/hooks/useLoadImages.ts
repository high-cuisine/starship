const background1 = './backgrounds/background1.png';
const background2 = './backgrounds/background2.png';
const background3 = './backgrounds/background3.png';
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

const images = [
    background1,
    background2,
    background3,
    background4,
    background5,
    background6,
    background7,
    background8,
    background9,
    background10,
    bulletElectro1,
    bulletElectro2,
    bulletFire1,
    bulletFire2,
    bulletFire,
    bulletLz1,
    bulletLz2,
    bulletLz3,
    bulletPlz2,
    bulletPlz1
]

const useLoadImages = () => {

    const preloadImages = (images:string[]) => {
        images.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    };
    
    function startLoading() {
        
        preloadImages(images);
    }

    return {startLoading}
}

export { useLoadImages }