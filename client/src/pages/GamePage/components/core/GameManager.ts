import { Image } from "konva/lib/shapes/Image"
import Player from "./Player"
import { Layer } from "konva/lib/Layer"
import CoinsManager from "./CoinsManager";
import { Rect as RectTypeKonva } from "konva/lib/shapes/Rect";
import { Text as KonvaTextType } from 'konva/lib/shapes/Text';
import { useUserStore } from "../../../../features/store/useUserStore";
import { PLAYERY } from "../../../../constants/constants";
import { useGameStore } from "../../../../features/store/useGameStore";
import SoundServise from './SoundServise';

class GameManager {
    
    startGame(
            userRef:React.RefObject<Image>, 
            canvasRef:React.RefObject<Layer>, 
            coinLayerRef:React.RefObject<Layer>, 
            bulletsRef:React.RefObject<Layer>,
            enduraceRef:React.RefObject<RectTypeKonva>,
            coinsCounterRef: React.RefObject<KonvaTextType>,
            coinBalance:number,
            bulletImage: string
        ) {
            userRef.current?.x(window.innerWidth / 2 + 75);
            userRef.current?.y(PLAYERY);
    
            Player.init({userRef, canvasRef, enduraceRef, bulletsRef, bulletImage});
            Player.startListener();
            Player.animateBullets();

            CoinsManager.init(coinLayerRef, coinsCounterRef, coinBalance);
            CoinsManager.spawnCoins(0);
            
            SoundServise.start(false);
      
    }

    saveCoinsInEnd() {
        const coins = CoinsManager.balance;
        useUserStore.getState().setCoin(coins);
        if(useGameStore.getState().dailyMultiPlay.status === 'active' || useGameStore.getState().dailyRecharge.status === 'active') {
            useGameStore.getState().disableDaily();
        }
    }

    getBulletImage() {

    }

    changeSound(state:boolean) {
        console.log(state)
        SoundServise.start(state);
    }
}
export default new GameManager();