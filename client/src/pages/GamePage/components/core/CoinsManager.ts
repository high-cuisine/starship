import { Image as KonvaImageType } from 'konva/lib/shapes/Image';
import { COIN_COUNT_IN_LINE, COIN_LINES_COUNT, COIN_SIZE, TOP_COIN_Y_POSITION } from '../../../../constants/constants';
import { Layer } from 'konva/lib/Layer';
import Konva from 'konva';
import { coinImg } from '../utils/coinImageLoadder';
import { Text as KonvaTextType } from 'konva/lib/shapes/Text';
import { useUserStore } from '../../../../features/store/useUserStore';
import { formatedNumber } from '../../../../utils/formatedNumberShort';
import { getLanguageInfo } from '../../../../utils/getLeguageInfo';
import { useGameStore } from '../../../../features/store/useGameStore';
import eventBus from './EventBus';

interface CoinProps {
    x:number,
    y:number,
  }

class CoinsManager {
    
    coins: KonvaImageType[]= [];
    coinLayerRef: React.RefObject<Layer> | null = null;
    bannerTextRef: React.RefObject<KonvaTextType> | null = null;
    balance: number = useUserStore.getState().getCoins();
    isRespawn: boolean = false;
    multiplecsor: number = 1;
    
    
    init(coinLayerRef:React.RefObject<Layer>, coinsCounterRef:React.RefObject<KonvaTextType>, balance:number) {
       this.coinLayerRef = coinLayerRef;
       this.bannerTextRef = coinsCounterRef;
       this.balance = balance;
       this.multiplecsor = getLanguageInfo(balance).multiplier;

       this.bannerTextRef.current?.text(formatedNumber(balance).toString());
    }

    createCoinElem (i:number, j:number) {
      if(!this.coinLayerRef) return;
      if(!this.coinLayerRef.current) return;
      if(!this.coins) return;

      const yCoin = Number(TOP_COIN_Y_POSITION + j * COIN_SIZE * 2 + (i % 2 === 0 ? COIN_SIZE : 0));
      const coinShape = this.createCoin({x:Number(i * COIN_SIZE * 2 + COIN_SIZE + (window.innerWidth - COIN_COUNT_IN_LINE * COIN_SIZE * 3.1) / 2), y:yCoin})
      this.coinLayerRef.current?.getLayer().add(coinShape);
      this.coins.push(coinShape);
    }
    
    spawnCoins = async (delay:number) => {    
        if(!this.coinLayerRef) return;
        if(!this.coinLayerRef.current) return;
        if(!this.coins) return;

        this.coinLayerRef.current.removeChildren();
        this.coins = [];
        
        this.isRespawn = true;
        for (let i = 0; i < COIN_LINES_COUNT; i++) {
          for (let j = 0; j < COIN_COUNT_IN_LINE; j++) {
            if(delay) {
              setTimeout(() => this.createCoinElem(i, j), (i + j) * delay)
            }
            else {
              this.createCoinElem(i, j)
            }
          }
        }
        this.isRespawn = false;
        this.coinLayerRef.current?.batchDraw();
      };

    removeCoin = (coin: KonvaImageType) => {
        if(!this.coinLayerRef) return;
        if(!this.coinLayerRef.current) return;
        if(!this.coins) return;

        const index = this.coins.indexOf(coin);
        
        eventBus.emit("activeSound", "coin");

        if (index > -1) {
            this.coins.splice(index, 1);
            const lenght = useGameStore.getState().multiplyLevel;
            this.balance = this.balance + Math.max(1, lenght) * this.multiplecsor;
            this.bannerTextRef?.current?.text(`${formatedNumber(Number(this.balance))}`);
            coin.destroy();
            this.coinLayerRef.current?.batchDraw();
        }

        if(this.coins.length === 0) {
            setTimeout(() => {
              this.spawnCoins(40);
            }, 50)
            this.isRespawn = true;
        }

    };

    createCoin = ({ x, y }: CoinProps): Konva.Image => {
        return new Konva.Image({
          x,
          y,
          width: COIN_SIZE,
          height: COIN_SIZE,
          image: coinImg,
        });
      };
}

export default new CoinsManager();