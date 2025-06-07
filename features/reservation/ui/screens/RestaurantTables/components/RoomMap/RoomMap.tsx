import { RoomTable } from "@/features/reservation/domain/RoomTable";
import { Canvas, useCanvasRef } from "@shopify/react-native-skia";
import { FC, memo, useMemo } from "react";
import { StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import CircleShape from "./Shapes/Circle";
import RectangleShape from "./Shapes/Rectangle";
import SquareShape from "./Shapes/Square";

const CANVAS_MARGIN = 0.7;

type RoomMapProps = {
  tables: RoomTable[];
};

const RoomMap: FC<RoomMapProps> = ({ tables }) => {
  const ref = useCanvasRef();

  const canvasSize = useSharedValue({ width: 0, height: 0 });

  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const savedOffsetX = useSharedValue(0);
  const savedOffsetY = useSharedValue(0);

  const zoom = useSharedValue(1);
  const savedZoom = useSharedValue(1);

  const bounds = useMemo(() => {
    const xList = tables.map((table) => table.position.x);
    const yList = tables.map((table) => table.position.y);

    return {
      minX: Math.min(...xList),
      minY: Math.min(...yList),
      maxX: Math.max(...xList),
      maxY: Math.max(...yList),
    };
  }, [tables]);

  useAnimatedReaction(
    () => ({
      canvasWidth: canvasSize.value.width,
      canvasHeight: canvasSize.value.height,
    }),
    ({ canvasWidth, canvasHeight }) => {
      // or 1 to avoid division by zero in case of empty bounds
      const contentWidth = bounds.maxX - bounds.minX || 1;
      const contentHeight = bounds.maxY - bounds.minY || 1;

      const zoomX = canvasWidth / contentWidth;
      const zoomY = canvasHeight / contentHeight;

      zoom.value = Math.min(zoomX, zoomY) * CANVAS_MARGIN;

      offsetX.value =
        (canvasWidth - contentWidth * zoom.value) / 2 -
        bounds.minX * zoom.value;
      offsetY.value =
        (canvasHeight - contentHeight * zoom.value) / 2 -
        bounds.minY * zoom.value;

      savedOffsetX.value = offsetX.value;
      savedOffsetY.value = offsetY.value;
    },
    [canvasSize, tables, bounds]
  );

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      offsetX.value = savedOffsetX.value + e.translationX;
      offsetY.value = savedOffsetY.value + e.translationY;
    })
    .onEnd(() => {
      savedOffsetX.value = offsetX.value;
      savedOffsetY.value = offsetY.value;
    });

  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      zoom.value = savedZoom.value * e.scale;
    })
    .onEnd(() => {
      savedZoom.value = zoom.value;
    });

  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  return (
    <GestureDetector gesture={composedGesture}>
      <Canvas style={{ flex: 1 }} ref={ref} onSize={canvasSize}>
        {tables.map((table) => {
          const position = {
            x: table.position.x,
            y: table.position.y,
            offsetX,
            offsetY,
            zoom,
          };

          if (table.shape === "circle") {
            return (
              <CircleShape key={table.id} position={position} table={table} />
            );
          }

          if (table.shape === "square") {
            return (
              <SquareShape key={table.id} position={position} table={table} />
            );
          }

          if (table.shape === "rectangle") {
            return (
              <RectangleShape
                key={table.id}
                position={position}
                table={table}
              />
            );
          }

          return null;
        })}
      </Canvas>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({});

export default memo(RoomMap);
