import { RoomTable } from "@/features/reservation/domain/RoomTable";
import { FC, memo, useCallback, useMemo } from "react";
import { LayoutChangeEvent, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedReaction,
  useSharedValue,
} from "react-native-reanimated";
import MapItem from "./MapItem";
import Shape from "./Shape";

const CANVAS_MARGIN = 0.7;

type RoomMapProps = {
  tables: RoomTable[];
  onPressTable: (id: string) => void;
};

const RoomMap: FC<RoomMapProps> = ({ tables, onPressTable }) => {
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
      // avoid bounds calculation for less than 2 tables
      if (tables.length < 2) return;

      const contentWidth = bounds.maxX - bounds.minX;
      const contentHeight = bounds.maxY - bounds.minY;

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

  const onLayout = useCallback(
    (e: LayoutChangeEvent) => {
      const { width, height } = e.nativeEvent.layout;
      canvasSize.value = { width, height };
    },
    [canvasSize]
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
      <Animated.View style={styles.main} onLayout={onLayout}>
        {tables.map((table) => (
          <MapItem
            id={table.id}
            onPress={onPressTable}
            key={table.id}
            offsetX={offsetX}
            offsetY={offsetY}
            x={table.position.x}
            y={table.position.y}
            zoom={zoom}
          >
            <Shape roomTable={table} variant={table.shape} zoom={zoom} />
          </MapItem>
        ))}
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  main: {
    position: "relative",
    flex: 1,
    overflow: "hidden",
  },
});

export default memo(RoomMap);
