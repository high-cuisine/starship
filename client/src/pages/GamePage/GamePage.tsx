import { Layer, Stage } from "react-konva"
import { useEffect, useRef, useState } from "react"
import ShipPlayer from "../../entities/model/Player/Ship";
import { useGameCustom } from "../../features/hooks/useGameCustom";
import cls from './GamePage.module.scss'
import EnduraceLine from "../../entities/model/enduraceLine/enduraceLine";
import GameManager from "./components/core/GameManager";
import { Rect as RectTypeKonva } from "konva/lib/shapes/Rect";
import { Banner } from "./model/Banner/Banner";
import { useUserStore } from "../../features/store/useUserStore";
import stars from '../../assets/backgrounds/333.webp'
import audioOn from '../../assets/icons/soundOn.png';
import audioOff from '../../assets/icons/soundOff.png';
import eventBus from "./components/core/EventBus";
import back from '../../assets/icons/back.png';

const GamePage = () => {

    const canvasRef = useRef(null);
    const userRef = useRef(null);
    const bulletRef = useRef(null);
    const textRef = useRef(null);
    const enduraceRef:React.RefObject<RectTypeKonva> = useRef(null);
    const isStartGame = useRef(false);
    const [isSound, setIsSound] = useState({
        state:'off',
        audio:audioOff
    });
    
    const user = useUserStore();
    const { playerImage, backgroundImage, bulletType} = useGameCustom({level:Math.max(Number(user.level), 1)});

    useEffect(() => {
        console.log("GamePage монтируется");
        GameManager.startGame(userRef, canvasRef, bulletRef, bulletRef, enduraceRef, textRef, Number(user.user?.coins), bulletType);
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

    eventBus.on('changeState', (sound:'off' | 'on') => {
        if(sound === 'on') {
            if(isSound.state === 'on') {
                setIsSound({
                    state:'off',
                    audio: audioOff
                })
            }
            else {
                setIsSound({
                    state:'on',
                    audio: audioOn
                })
            }
        }
    })

    function changeSoundState() {
        GameManager.changeSound(!(isSound.state === 'on'));
        if(isSound.state === 'on') {
            setIsSound({
                state:'off',
                audio: audioOff
            })
        }
        else {
            setIsSound({
                state:'on',
                audio: audioOn
            })
        }
    }

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
                        startNumber={Number(user.user?.coins)}
                        coinsCounterRef={textRef}
                    ></Banner>
                    <EnduraceLine
                        enduraceRef={enduraceRef} endurace={0}>
                    </EnduraceLine>
                </Layer>
                
            </Stage>
            <img className={cls.background} src={backgroundImage}></img>
            <img className={cls.stars} src={stars}></img>
            <div className={cls.SoundController} onClick={() => changeSoundState()}>
                <img src={isSound.audio}></img>
            </div>

            <div className={cls.BackController} onClick={() => window.history.back()}>
                <img src={back}></img>
            </div>
        </div>
        
    )
}

export { GamePage }