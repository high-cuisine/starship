import { Layer } from "konva/lib/Layer";
import { Image } from "konva/lib/shapes/Image";
import { Rect } from "konva/lib/shapes/Rect";
import { COIN_COUNT_IN_LINE, COIN_LINES_COUNT, COIN_SIZE, PLAYERY } from "../../../../constants/constants";
import Bullet from "../../model/Bullet/Bullet";
import CoinsManager from "./CoinsManager";
import { Rect as RectType } from "konva/lib/shapes/Rect";
import { useGameStore } from "../../../../features/store/useGameStore";
import eventBus from "./EventBus";
//import { useUserStore } from "../../../../store/useUserStore";

type IPlayer = {
  userRef: React.RefObject<Image>;
  canvasRef: React.RefObject<Layer>;
  enduraceRef: React.RefObject<RectType>;
  bulletsRef: React.RefObject<Layer>,
  bulletImage: string,
};

const PLAYERCENTER = window.innerWidth * 0.3;

class Player {
  userRef: React.RefObject<Image> | null = null;
  canvasRef: React.RefObject<Layer> | null = null;
  initialShipX: number | null = window.innerWidth / 2 - PLAYERCENTER / 2;
  fireTimer: number = 0;
  playerX: number = 0;
  startX: number | null = window.innerWidth / 2 - PLAYERCENTER / 2;

  bullets: Image[] = [];
  bulletsRef: React.RefObject<Layer> | null = null;

  endurace: number = 0;
  enduraceRef: React.RefObject<RectType> | null = null;
  isReload: boolean = false;
  bulletImage: string = '';

  MAX_COUNT = COIN_COUNT_IN_LINE * COIN_LINES_COUNT;

  init({ userRef, canvasRef, enduraceRef, bulletsRef, bulletImage }: IPlayer) {
    this.userRef = userRef;
    this.canvasRef = canvasRef;
    this.initialShipX = window.innerWidth / 2 - PLAYERCENTER / 2;
    this.playerX = window.innerWidth / 2 - PLAYERCENTER / 2;
    this.fireTimer = 0;
    this.startX = null;
    this.enduraceRef = enduraceRef;
    this.bulletsRef = bulletsRef;
    this.endurace = this.MAX_COUNT;
    this.bulletImage = bulletImage;
  //  console.log("STARRRT")
  //  setTimeout(() => {
  //   if(!this.userRef) return;
  //   this.userRef.current?.x(window.innerWidth / 2 - 75);
  //   this.userRef.current?.y(PLAYERY);
    
  //  }, 40)
  }

  startListener() {
    if (!this.canvasRef?.current || !this.userRef?.current) return;
    this.canvasRef.current.addEventListener("touchstart", this.handleTouchStart as EventListener);
    this.canvasRef.current.addEventListener("touchmove", this.handleTouchMove as EventListener);
    this.canvasRef.current.addEventListener("touchend", this.handleTouchEnd as EventListener);

    this.userRef.current.x(window.innerWidth / 2 - PLAYERCENTER / 2);
  }

  handleTouchStart = (e: TouchEvent) => {
    if (!this.userRef?.current) return;
    this.startX = e.touches[0].clientX;
    this.initialShipX = e.touches[0].clientX;
    this.startSpawnBullets();
  };

  startSpawnBullets = () => {
    if (!this.userRef?.current) return;
    clearInterval(this.fireTimer);
    this.fireTimer = window.setInterval(() => {
      this.createBullet(this.playerX + PLAYERCENTER / 2 - 10);
    }, 300);
  };

  stopSpawnBullets = () => {
    if (this.fireTimer) {
      clearInterval(this.fireTimer);
      this.fireTimer = 0;
    }
  };

  handleTouchEnd = () => {

    this.startX = null;
    this.stopSpawnBullets();
  };

  handleTouchMove = (e: TouchEvent) => {
    if (!this.userRef?.current || this.startX === null || this.initialShipX === null) return;
    const deltaX = e.touches[0].clientX - this.startX - PLAYERCENTER / 2;
    let newX = this.initialShipX + deltaX;
    const leftBorder = -30;
    const rightBorder = window.innerWidth - this.userRef.current.width() + 30;
    if (newX < leftBorder) newX = leftBorder;
    if (newX > rightBorder) newX = rightBorder;
    this.userRef.current.x(newX);
    this.playerX = newX;
  };

    createBullet = (x:number) => {
        if(!this.bulletsRef) return;

        if(this.endurace === 0) {
          this.startRegenEndurace();
        return;
        }
        if(this.endurace < 1 || this.isReload) {
        return;
        }

        eventBus.emit("activeSound", "shoot");
        const bullet = Bullet({x:x, y:PLAYERY, imageSrc:this.bulletImage});
        if(!bullet) return;
          this.bullets.push(bullet);

        this.bulletsRef?.current?.getLayer().add(bullet);
        this.bulletsRef?.current?.getLayer().batchDraw();
    }

    rasleCoin(coin:Image, bullet:Rect) {
      CoinsManager.removeCoin(coin);
      this.decrimentEndurace();
      const bulletIndex = this.bullets.findIndex(el => el === bullet);
      this.bullets.splice(bulletIndex, 1);
      bullet.destroy(); 
      //useUserStore.getState().incrimentCoin();
      return;  
    }

    checkCollisions = () => {
      const coins: Image[] = CoinsManager.coins;
        if (!coins) return;
        for(let i = this.bullets.length - 1; i >= 0; i--) {
              const bullet = this.bullets[i];
              for(let j = coins.length - 1; j >= 0; j--) {
                  const coin = coins[j];
    
                  if (
                      bullet.x() < coin.x() + COIN_SIZE &&
                      bullet.x() + COIN_SIZE > coin.x() &&
                      bullet.y() < coin.y() + COIN_SIZE &&
                      bullet.y() + COIN_SIZE > coin.y()
                  ) {
                    this.rasleCoin(coin, bullet)
                  }
              }
                
          
        }
    };
    
     animateBullets = () => {
        if (!this.bulletsRef?.current) return;

        this.bullets.forEach((bullet, index) => {
        bullet.y(bullet.y() - 5);
        this.checkCollisions();

        if (bullet.y() < 0) {
            bullet.destroy();
            this.bullets.splice(index, 1);
        }
        });

        this.bulletsRef.current.getLayer().batchDraw();

        requestAnimationFrame(this.animateBullets);
    };

    async startRegenEndurace() {
      this.isReload = true;
      while (Number(this.endurace) < this.MAX_COUNT) {
    
          this.endurace++;
          this.enduraceRef?.current?.width(Number((window.innerWidth * 0.7 - 8) * (this.endurace / this.MAX_COUNT)))
          await new Promise(resolve => setTimeout(resolve, 100 / useGameStore.getState().rechargeLevel));
      }
      this.isReload = false;
    }

    decrimentEndurace() {
      if(!this.enduraceRef) return;
      if(!this.enduraceRef.current) return;

      
      if (Number(this.endurace) !== 0) {
        this.endurace--;
        this.enduraceRef.current?.width(Number((window.innerWidth * 0.7 - 8) * (this.endurace / this.MAX_COUNT)))
      }
    }
}

export default new Player();
