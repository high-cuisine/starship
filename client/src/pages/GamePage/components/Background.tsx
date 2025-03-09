import { Image as KonvaImage } from 'react-konva';
import useImage from 'use-image';

type BackgroundImageProps = {
    imageSrc:string
}

const BackgroundImage = ({imageSrc}:BackgroundImageProps) => {
  const [image] = useImage(imageSrc); // Замените на правильный путь к вашему фону

  const aspectRatio = image ? image.height / image.width : 1;
  const height = window.innerWidth * aspectRatio;

  return (
    <KonvaImage
      image={image}
      x={0}
      y={(window.innerHeight - height) / 2}
      width={window.innerWidth}
      height={height}
    />
  );
};

export default BackgroundImage;
