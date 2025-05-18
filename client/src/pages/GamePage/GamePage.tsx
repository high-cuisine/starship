import { Layer, Stage } from "react-konva"
import { useEffect, useRef } from "react"
import ShipPlayer from "../../entities/model/Player/Ship";
import { useGameCustom } from "../../features/hooks/useGameCustom";
import cls from './GamePage.module.scss'
import EnduraceLine from "../../entities/model/enduraceLine/enduraceLine";
import GameManager from "./components/core/GameManager";
import { Rect as RectTypeKonva } from "konva/lib/shapes/Rect";
import { Banner } from "./model/Banner/Banner";
import { useUserStore } from "../../features/store/useUserStore";
import stars from '../../assets/backgrounds/333.webp'
import eventBus from "./components/core/EventBus";


const GamePage = () => {

    const canvasRef = useRef(null);
    const userRef = useRef(null);
    const bulletRef = useRef(null);
    const textRef = useRef(null);
    const enduraceRef:React.RefObject<RectTypeKonva> = useRef(null);
    const isStartGame = useRef(false);
 
    
    const user = useUserStore();
    const { playerImage, backgroundImage, bulletType} = useGameCustom({level:Math.max(Number(user.level), 1)});

    useEffect(() => {
        console.log("GamePage монтируется");
        GameManager.startGame(userRef, canvasRef, bulletRef, bulletRef, enduraceRef, textRef, Number(user.user?.scores), bulletType);
        isStartGame.current = false;

        const timer = setTimeout(() => {
            isStartGame.current = true;
        }, 100)

        return () => {
            
            clearTimeout(timer);
            if(isStartGame.current) {
                console.log("GamePage размонтируется");
                GameManager.saveCoinsInEnd();
            }
        }
    }, [])    

    useEffect(() => {
        eventBus.emit('background', backgroundImage);
    }, [backgroundImage])

    return (
        <div className={cls.main}>
            <Stage 
                width={window.innerWidth}
                height={window.innerHeight}
                className={cls.canvas}
                ref={canvasRef}>
                <Layer ref={bulletRef}></Layer>
                
                <Layer>
                    <ShipPlayer
                        imageSrc={playerImage}
                        userRef={userRef}
                    ></ShipPlayer>
                </Layer>

                <Layer>
                    <Banner
                        startNumber={Number(user.user?.scores)}
                        coinsCounterRef={textRef}
                    ></Banner>
                    <EnduraceLine
                        enduraceRef={enduraceRef} endurace={0}>
                    </EnduraceLine>
                </Layer>
                
            </Stage>
            <img className={cls.stars} src={stars}></img>
            <img src={backgroundImage} className={cls.background}></img>
        </div>
        
    )
}

export { GamePage }