import { Rect } from "react-konva";
import { Rect as RectType } from "konva/lib/shapes/Rect";

interface EnduraceLineProps {
  enduraceRef:React.RefObject<RectType> | null,
}

const EnduraceLine = ({enduraceRef}:EnduraceLineProps) => { 

  return (
    <>
        <Rect
          width={window.innerWidth * 0.7}
          fill={'#1C384A'}
          cornerRadius={15}
          strokeWidth={2}
          stroke={'#29475B'}
          x={window.innerWidth / 2 - (window.innerWidth * 0.7 / 2)}
          y={window.innerHeight - 130}
          height={24}
        ></Rect>

        <Rect
          ref={enduraceRef}
          width={window.innerWidth * 0.7 - 8}
          fill={'#F1C14B'}
          cornerRadius={15}
          x={window.innerWidth / 2 - (window.innerWidth * 0.7 / 2) + 4}
          y={window.innerHeight - 130 + 4}
          height={16}
        ></Rect>
    </>
  )
};

export default EnduraceLine;
