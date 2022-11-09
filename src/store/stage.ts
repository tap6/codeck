import create from 'zustand';
import Konva from 'konva';

interface StageState {
  stageRef: Konva.Stage | null;
  width: number;
  height: number;
  scale: Konva.Vector2d;
  position: Konva.Vector2d;
  setStageRef: (stageRef: Konva.Stage | null) => void;
  setScale: (newScale: number) => void;
  setPosition: (position: Konva.Vector2d) => void;
  calcAbsolutePositionToRelative: (
    absolutePos: Konva.Vector2d
  ) => Konva.Vector2d;
  getPointerPosition: () => Konva.Vector2d;
}

export const useStageStore = create<StageState>((set, get) => ({
  stageRef: null,
  width: window.innerWidth,
  height: window.innerHeight,
  scale: {
    x: 1,
    y: 1,
  },
  position: {
    x: 0,
    y: 0,
  },
  setStageRef: (stageRef) => {
    set({ stageRef });
  },
  setScale: (newScale) => {
    set({
      scale: {
        x: newScale,
        y: newScale,
      },
    });
  },
  setPosition: (position) => {
    set({
      position,
    });
  },
  /**
   * 将绝对坐标计算为相对于stage的相对坐标
   */
  calcAbsolutePositionToRelative: (
    absolutePos: Konva.Vector2d
  ): Konva.Vector2d => {
    const { position, scale } = get();

    return {
      x: (absolutePos.x - position.x) / scale.x,
      y: (absolutePos.y - position.y) / scale.y,
    };
  },

  getPointerPosition: () => {
    return get().stageRef?.getPointerPosition?.() ?? { x: 0, y: 0 };
  },
}));
