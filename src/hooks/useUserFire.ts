import { useRef } from "react"
import Bullet from "../entities/model/Bullet/Bullet";
import { Layer } from "konva/lib/Layer";
import { Rect } from "konva/lib/shapes/Rect";
import { COIN_SIZE, PLAYERY } from "../constants/constants";
import { useEnduraceUser } from "./useEnduranceUser";
import { Image as KonvaImageType } from 'konva/lib/shapes/Image';

type useUserFireProps = {
    bulletLayer: React.RefObject<Layer>,
    coins: React.RefObject<KonvaImageType[]>,
    removeCoin: (value:KonvaImageType) => void,
    enduraceRef: React.RefObject<KonvaImageType>,
    isCoinsSpawning: React.RefObject<boolean>
}

const useUserFire = ({bulletLayer, coins, removeCoin, enduraceRef, isCoinsSpawning}:useUserFireProps) => {

    const bullets = useRef<Rect[]>([]);

    const {startRegenEndurace, decrimentEndurace, endurace, isRegen } = useEnduraceUser()

    const createBullet = (x:number) => {
      
        if(endurace.current === 0 && !isRegen.current) {
          startRegenEndurace({enduraceRef:enduraceRef});
          return;
        }
        if(endurace.current < 1 || isRegen.current || isCoinsSpawning.current) {
          return;
        }

        const bullet = Bullet({x:x, y:PLAYERY})
        bullets.current.push(bullet);

        bulletLayer.current?.add(bullet);
        bulletLayer.current?.getLayer().batchDraw();
        decrimentEndurace({enduraceRef:enduraceRef});
    }

    const checkCollisions = () => {
      if(!coins.current) return;
      bullets.current.forEach((bullet) => {
          coins.current?.forEach((coin) => {
              if (
                  bullet.x() < coin.x() + COIN_SIZE &&
                  bullet.x() + COIN_SIZE > coin.x() &&
                  bullet.y() < coin.y() + COIN_SIZE &&
                  bullet.y() + COIN_SIZE > coin.y()
              ) {
                
                  removeCoin(coin);
                  bullet.destroy();
                  bullets.current.pop();
              }
          });
      });
  };

    const animateBullets = () => {
        if (!bulletLayer.current) return;

        bullets.current.forEach((bullet, index) => {
          bullet.y(bullet.y() - 5);
          checkCollisions();

          if (bullet.y() < 0) {
            bullet.destroy();
            bullets.current.splice(index, 1);
          }
        });

        bulletLayer.current.batchDraw();

        requestAnimationFrame(animateBullets);
      };
 
      const startBulletAnimation = () => {
        animateBullets();
      };

    return { startBulletAnimation, createBullet, checkCollisions}
}

export { useUserFire }