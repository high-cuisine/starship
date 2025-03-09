import { Layer } from "konva/lib/Layer";

type UseAnimateObjectsProps = {
  dinamicLayerRef: React.RefObject<Layer>;
};

const useAnimateObjects = ({ dinamicLayerRef }: UseAnimateObjectsProps) => {
  let animationFrameId: number | null = null;

  const startAnimations = () => {
    const MS_PER_UPDATE = 1000 / 60;
    let previous = performance.now();
    let lag = 0.0;

    const update = () => {
      const current = performance.now();
      lag += current - previous;
      previous = current;

      while (lag >= MS_PER_UPDATE) {
        // Рисуем слой
        dinamicLayerRef.current?.batchDraw();
        lag -= MS_PER_UPDATE;
      }

      animationFrameId = requestAnimationFrame(update);
    };

    animationFrameId = requestAnimationFrame(update);
  };

  const stopAnimaction = () => {
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };

  return { startAnimations, stopAnimaction };
};

export { useAnimateObjects };
