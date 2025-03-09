import { useEffect, useRef } from "react"
import { Image as KonvaImageType } from 'konva/lib/shapes/Image';
import { useUserFire } from "./useUserFire";
import { Layer } from "konva/lib/Layer";

type usePlayerControllerProps = {
    ref:React.RefObject<HTMLDivElement>
    userRef: React.RefObject<KonvaImageType>
    bulletLayer: React.RefObject<Layer>;
    coins: React.RefObject<KonvaImageType[]>,
    removeCoin: (coin:KonvaImageType) => void,
    enduraceRef: React.RefObject<KonvaImageType>,
    isCoinsSpawning: React.RefObject<boolean>
}



const usePlayerController = ({ref, userRef, bulletLayer, coins, removeCoin, enduraceRef, isCoinsSpawning}:usePlayerControllerProps) => {

    const {startBulletAnimation, createBullet} = useUserFire({bulletLayer, coins:coins, removeCoin:removeCoin, enduraceRef, isCoinsSpawning});

    const startX = useRef<number | null>(null);
    const initialShipX = useRef<number | null>(null);
    const fireTimer = useRef(0);
    const playerX = useRef(0);

    const handleTouchStart = (e: TouchEvent) => {
        startX.current = e.touches[0].clientX;
        
        if(userRef.current) {
            initialShipX.current = userRef.current?.x() || window.innerWidth / 2;
        }
        startSpawnBullets();
        
    }

    const startSpawnBullets = () => {
        if(!userRef.current) return;

        clearInterval(fireTimer.current)
        fireTimer.current = setInterval(() => {
            createBullet(Number(playerX.current + 75));
           
        }, 500)
    }

    const stopSpawnBullets = () => {
        clearInterval(fireTimer.current)
    }

    const handleTouchEnd = () => {
        startX.current = null;
        stopSpawnBullets();
    }

    const handleTouchMove = (e: TouchEvent) => {
        if(!startX.current || !initialShipX.current || !userRef.current) return;
        const deltaX = e.touches[0].clientX - startX.current;
        let newX:number = initialShipX.current + deltaX;

        const leftBorder = -30;
        const rightBorder = window.innerWidth - userRef.current.width() + 30;

        if(newX < leftBorder) {
            newX = leftBorder;
        }
        if(newX > rightBorder) {
            newX = rightBorder
        }

        userRef.current.x(newX);
        playerX.current = newX;
        bulletLayer.current?.getLayer().batchDraw();
        
    }

    useEffect(() => {
        if(!ref.current || !userRef.current) return;
        ref.current.addEventListener('touchstart', handleTouchStart as EventListener);
        ref.current.addEventListener('touchmove ', handleTouchMove as EventListener);
        ref.current.addEventListener('touchend ', handleTouchEnd as EventListener);

        startBulletAnimation();

        return () => {
            if(!ref.current || !userRef.current) return;
            ref.current.removeEventListener('touchstart', handleTouchStart as EventListener);
            ref.current.removeEventListener('touchmove', handleTouchMove as EventListener);
            ref.current.removeEventListener('touchend', handleTouchEnd as EventListener);
        };
    }, [ref, userRef])
}

export { usePlayerController }