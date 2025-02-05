import { useRef } from "react";
import { COIN_COUNT_IN_LINE, COIN_LINES_COUNT } from "../constants/constants";
import { Image as KonvaImageType } from 'konva/lib/shapes/Image';

interface EnduraceProps {
    enduraceRef?: React.RefObject<KonvaImageType> | null
}

const useEnduraceUser = () => {
    const endurace = useRef(COIN_COUNT_IN_LINE * COIN_LINES_COUNT);
    const MAX_COUNT = COIN_COUNT_IN_LINE * COIN_LINES_COUNT;
    const isRegen = useRef(false);
    
    const decrimentEndurace = ({ enduraceRef }: EnduraceProps) => {
        if (!enduraceRef) return;
        if (Number(endurace.current) !== 0 && enduraceRef.current) {
            endurace.current--;
            enduraceRef.current?.width(Number((window.innerWidth * 0.7 - 8) * (endurace.current / MAX_COUNT)))
        }
    }

    const startRegenEndurace = async ({ enduraceRef }: EnduraceProps) => {
        isRegen.current = true;
        while (Number(endurace?.current) < MAX_COUNT) {
      
            endurace.current++;
            enduraceRef?.current?.width(Number((window.innerWidth * 0.7 - 8) * (endurace.current / MAX_COUNT)))
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        isRegen.current = false;
    }

    return { startRegenEndurace, decrimentEndurace, endurace, isRegen };
}

export { useEnduraceUser };
