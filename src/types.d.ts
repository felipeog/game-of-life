declare global {
  type Color = {
    r: number;
    g: number;
    b: number;
    a?: number;
  };

  type Grid = Array<Array<number>>;

  type State = {
    generation: Grid;
    size: {
      width: number;
      height: number;
    };
    generationsPerSecond: number;
    animateTimeoutId: number | null;
    color: {
      background: Color;
      foreground: Color;
    };
    hasTrail: boolean;
    trailAlpha: number;
    isRounded: boolean;
    radius: number;
    isDragging: boolean;
  };
}

export {};
