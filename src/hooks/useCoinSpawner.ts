import { Layer } from "konva/lib/Layer";
import { Image as KonvaImageType } from "konva/lib/shapes/Image";
import { COIN_COUNT_IN_LINE, COIN_LINES_COUNT, COIN_SIZE } from "../constants/constants";
import Coin from "../entities/model/Coin/Coin";
import { useRef, useState } from "react";

type useCoinSpawnerProps = {
    userRef: React.RefObject<KonvaImageType>,
    coinLayerRef: React.RefObject<Layer>
};

const useCoinSpawner = ({ coinLayerRef }: useCoinSpawnerProps) => {
    const coins = useRef<KonvaImageType[]>([]);
    const isCoinsSpawning = useRef(false);
    const [isRespawn, setIsRespawn] = useState(false);

    const spawnCoins = () => {
        isCoinsSpawning.current = true;
        for (let i = 0; i < COIN_LINES_COUNT; i++) {
          for (let j = 0; j < COIN_COUNT_IN_LINE; j++) {
            const coin = Coin({
                x: Number(i * COIN_SIZE * 2 + COIN_SIZE + (window.innerWidth - COIN_COUNT_IN_LINE * COIN_SIZE * 3.1) / 2),
                y: Number(j * COIN_SIZE * 2),
            });
            coinLayerRef.current?.add(coin);
            coins.current.push(coin);
          }
        }
        isCoinsSpawning.current = false;
        coinLayerRef.current?.batchDraw();
      };

    const removeCoin = (coin: KonvaImageType) => {
        const index = coins.current.indexOf(coin);

        if (index > -1) {
            coins.current.splice(index, 1);
            coin.destroy();
            coinLayerRef.current?.batchDraw();
        }

        if(coins.current.length === 0) {

            isCoinsSpawning.current = true;
        }

    };



    return { spawnCoins, coins, removeCoin, isCoinsSpawning, isRespawn };
};

export { useCoinSpawner };
