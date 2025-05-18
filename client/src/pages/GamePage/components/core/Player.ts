import { Layer } from "konva/lib/Layer";
import { Image } from "konva/lib/shapes/Image";
import { Rect } from "konva/lib/shapes/Rect";
import { COIN_COUNT_IN_LINE, COIN_LINES_COUNT, COIN_SIZE, PLAYERY } from "../../../../constants/constants";
import Bullet from "../../model/Bullet/Bullet";
import CoinsManager from "./CoinsManager";
import { Rect as RectType } from "konva/lib/shapes/Rect";
import { useGameStore } from "../../../../features/store/useGameStore";
import eventBus from "./EventBus";
import UserService from "../../../../features/api/Services/UserService";
import { useUserStore } from "../../../../features/store/useUserStore";
import { getLanguageInfo } from "../../../../utils/getLeguageInfo";
//import { useUserStore } from "../../../../store/useUserStore";
import Konva from 'konva';

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
  raundFire: number = 0;
  multiplecsor: number = 1;

  bullets: Image[] = [];
  bulletsRef: React.RefObject<Layer> | null = null;

  endurace: number = 0;
  enduraceRef: React.RefObject<RectType> | null = null;
  isReload: boolean = false;
  bulletImage: string = '';
  bulletRef:React.RefObject<Layer> | undefined;

  MAX_COUNT = COIN_COUNT_IN_LINE * COIN_LINES_COUNT;

  init({ userRef, canvasRef, enduraceRef, bulletsRef, bulletImage }: IPlayer, balance:number, bulletRef:React.RefObject<Layer>) {
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
    this.multiplecsor = getLanguageInfo(balance).multiplier;
    this.bulletRef = bulletRef

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

  stopSpawnBullets = async () => {
    if (this.fireTimer) {
      clearInterval(this.fireTimer);
      this.fireTimer = 0;
      await UserService.savePoints(this.raundFire * this.multiplecsor);
      useUserStore.getState().incrementCoin(this.raundFire * this.multiplecsor);
      this.raundFire = 0;
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
      this.raundFire++;
      this.decrimentEndurace();
      const bulletIndex = this.bullets.findIndex(el => el === bullet);
      this.bullets.splice(bulletIndex, 1);
      bullet.destroy(); 

      console.log(coin.y(), coin.x())

      this.spawnNumber(Number(coin.x()), Number(coin.y()))
      
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


    spawnNumber(x:number, y:number) {
    const text = new Konva.Text({
        text: `+${this.multiplecsor}`,
        fontSize: 24,
        fill: 'white',
        fontFamily: 'Inter',
        x,
        y,
        opacity: 1,
      });

      if(this.bulletRef?.current)
        this.bulletRef.current.add(text);

      text.to({
        opacity: 0,
        duration: 1,
        onFinish: () => {
          text.destroy(); 
        },
      });
    }
}

export default new Player();


/**
 * 
 *  const handleJump = (e) => {
    if (GameState.state !== 0 && tapsCount > 4) return;
    if(!isControll || (!GameState.isResetGame && timeRef.current < 100)) return;
    tapsCount++;
    window?.Telegram?.WebApp?.HapticFeedback.impactOccurred('medium');

    const currentTime = Date.now();
    const timeSinceLastJump = currentTime - (window.lastJumpTime || 0);
    const jumpStrength = timeSinceLastJump < tapBoostInterval
      ? Math.max(maxJumpStrength, velocityRef.current + minJumpStrength)
      : minJumpStrength;

    velocityRef.current = jumpStrength;
    window.lastJumpTime = currentTime;

   
    coinsRef.current = coinsRef.current + 1;
    if(coinsVisualRef.current) {
      coinsVisualRef.current.text(coinsRef.current);
    }
    renderCoins();

    const pointerPosition = e.target.getStage().getPointerPosition();

    const newIndicator = { x: pointerPosition.x, y: pointerPosition.y };
    const text = new window.Konva.Text({
      text: '+1',
      fontSize: 24,
      fill: 'white',
      fontFamily: 'MonBold',
      x: newIndicator.x,
      y: newIndicator.y,
      opacity: 1,
    });

    // Добавляем текст на слой
    dinaminLayerRef.current.add(text);

    // Анимация исчезновения
    text.to({
      opacity: 0,
      duration: 1,
      onFinish: () => {
        text.destroy(); // Удаляем текст после исчезновения
      },
    });
    //dinaminLayerRef
  };
 */