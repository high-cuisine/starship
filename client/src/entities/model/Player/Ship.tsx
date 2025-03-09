import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';
import { Image as KonvaImageType } from 'konva/lib/shapes/Image';
import { PLAYERY } from '../../../constants/constants';

interface BackgroundImageProps {
  imageSrc:string,
  userRef: React.RefObject<KonvaImageType>
}

const ShipPlayer = ({imageSrc, userRef}:BackgroundImageProps) => {
  const [image] = useImage(imageSrc); 
  
  const height = window.innerWidth * 0.3;

  return (
    <KonvaImage
      ref={userRef}
      image={image}
      x={100}
      y={PLAYERY}
      width={height}
      height={height}
    />
  );
};

export default ShipPlayer;
