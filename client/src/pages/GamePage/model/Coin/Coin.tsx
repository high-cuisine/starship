import Konva from 'konva';
import { Image } from 'konva/lib/shapes/Image';
import useImage from 'use-image';
import coinImage from '../../../../assets/images/coin.png'
import { COIN_SIZE } from '../../../../constants/constants';

interface CoinProps {
  x:number,
  y:number,
}

const Coin = ({x, y}:CoinProps):Image => { 
  const [image] = useImage(coinImage);

  const size = COIN_SIZE;

  return new Konva.Image({
    x,
    y,
    width:size,
    height:size,
    image:image
  })
};

export default Coin;
