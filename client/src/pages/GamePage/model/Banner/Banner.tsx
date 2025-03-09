import React, { useRef } from 'react';
import { Image as KonvaImage, Rect, Text } from 'react-konva';
import useImage from 'use-image';
import { Image as KonvaImageType } from 'konva/lib/shapes/Image';
import { Text as KonvaTextType } from 'konva/lib/shapes/Text';
import coin from '../../../../assets/icons/coin.png';
import { formatedNumber } from '../../../../utils/formatedNumberShort';

interface BackgroundImageProps {
  coinsCounterRef: React.RefObject<KonvaTextType>;
  startNumber:number
}

const Banner = ({ coinsCounterRef, startNumber }: BackgroundImageProps) => {
  const [image] = useImage(coin);
  const imageRef = useRef<KonvaImageType>(null);

  const aspectRatio = image ? image.height / image.width : 1;
  const height = 24 * aspectRatio;

  return (
    <>
      <Rect 
        fill="#306283" 
        width={177} 
        height={56}
        opacity={0.8}
        cornerRadius={10} 
        y={20}
        x={window.innerWidth / 2 - 177/2}
      />
      <KonvaImage
        ref={imageRef}
        image={image}
        x={window.innerWidth / 2 - 177/2 + 10}
        y={35}
        width={24}
        height={height}
      />
      <Text
        text={formatedNumber(startNumber).toString()}
        fontSize={30}
        fontStyle="bold"
        fontFamily="Inter"
        align="center"
        ref={coinsCounterRef}
        fill="#dfebf2"
        width={177}
        y={35}
        x={window.innerWidth / 2 - 177/2}
      />
    </>
  );
};

export { Banner };
