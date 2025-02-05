import Konva from 'konva';
import { Rect as RectType } from 'konva/lib/shapes/Rect';


interface BulletProps {
  x:number,
  y:number,
}

const Bullet = ({x, y}:BulletProps):RectType => { 

  return new Konva.Rect({
    x,
    y,
    width:4,
    height:9,
    fill:'gray'
  })
};

export default Bullet;
