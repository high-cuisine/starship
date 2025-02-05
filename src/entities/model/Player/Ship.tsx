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

  const aspectRatio = image ? image.height / image.width : 1;
  const height = 150 * aspectRatio;

  return (
    <KonvaImage
      ref={userRef}
      image={image}
      x={Number(userRef.current?.x)}
      y={PLAYERY}
      width={150}
      height={height}
    />
  );
};

export default ShipPlayer;
