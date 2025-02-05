import { Layer, Stage } from "react-konva"
import { usePlayerController } from "../../hooks/usePlayerControls"
import { useEffect, useRef } from "react"
import ShipPlayer from "../../entities/model/Player/Ship";
import { useGameCustome } from "../../hooks/useGameCustom";
import BackgroundImage from "./components/Background";
import cls from './GamePage.module.scss'
import { useCoinSpawner } from "../../hooks/useCoinSpawner";
import EnduraceLine from "../../entities/model/enduraceLine/enduraceLine";
import { useEnduraceUser } from "../../hooks/useEnduranceUser";

const GamePage = () => {

    const canvasRef = useRef(null);
    const userRef = useRef(null);
    const bulletRef = useRef(null);
    const enduraceRef = useRef(null)
    
    const { playerImage, backgroundImage} = useGameCustome({level:1});
    const { spawnCoins, removeCoin, coins, isCoinsSpawning, isRespawn } = useCoinSpawner({userRef, coinLayerRef:bulletRef});
    
    usePlayerController({ref:canvasRef, userRef, bulletLayer:bulletRef, coins, removeCoin, enduraceRef, isCoinsSpawning});
    const {endurace} = useEnduraceUser();
    
    console.log(endurace);

    useEffect(() => {
        console.log(isRespawn);
        if(isRespawn) {
            spawnCoins();
        }
    }, [isRespawn])

    spawnCoins();
    return (
        <Stage 
            width={window.innerWidth}
            height={window.innerHeight}
            className={cls.canvas}
            ref={canvasRef}>
            <Layer>
                <BackgroundImage
                    imageSrc={backgroundImage}
                ></BackgroundImage>
            </Layer>

            <Layer ref={bulletRef}></Layer>
            
            <Layer>
                <ShipPlayer
                    imageSrc={playerImage}
                    userRef={userRef}
                ></ShipPlayer>
            </Layer>

            <Layer>
                <EnduraceLine
                    enduraceRef={enduraceRef} endurace={0}></EnduraceLine>
            </Layer>
            
        </Stage>
    )
}

export { GamePage }