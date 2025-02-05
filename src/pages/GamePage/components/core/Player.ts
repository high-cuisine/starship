import { Layer } from "konva/lib/Layer"
import { Image } from "konva/lib/shapes/Image"

type IPlayer = {
    userRef: React.RefObject<Image>
    canvasRef: React.RefObject<Layer>
}

class Player {

    userRef: React.RefObject<Image>;
    canvasRef: React.RefObject<Layer>

    constructor({userRef, canvasRef}:IPlayer) {
        this.userRef = userRef
        this.canvasRef = canvasRef
    }
}

export default Player