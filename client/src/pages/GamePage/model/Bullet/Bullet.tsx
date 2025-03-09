import Konva from 'konva';
import { Image as ImageType } from 'konva/lib/shapes/Image';

interface BulletProps {
  x: number;
  y: number;
  imageSrc: string;
}

const Bullet = ({ x, y, imageSrc }: BulletProps): ImageType => {
  const img = new window.Image();
  img.src = imageSrc;

  return new Konva.Image({
    image: img,
    x,
    y,
    width: 20,
    height: 20,
  });
};

export default Bullet;
