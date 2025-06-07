import { SharedValue } from "react-native-reanimated";

type ShapePositionProps = {
  x: number;
  y: number;
  offsetX: SharedValue<number>;
  offsetY: SharedValue<number>;
  zoom: SharedValue<number>;
};

export { ShapePositionProps };
