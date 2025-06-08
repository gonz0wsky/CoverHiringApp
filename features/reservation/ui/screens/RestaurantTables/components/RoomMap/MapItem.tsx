import { FC, memo, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type MapItemProps = {
  id: string;
  onPress: (id: string) => void;

  x: number;
  y: number;
  offsetX: SharedValue<number>;
  offsetY: SharedValue<number>;
  zoom: SharedValue<number>;
  children: React.ReactNode;
};

const MapItem: FC<MapItemProps> = ({
  id,
  onPress,
  x,
  y,
  offsetX,
  offsetY,
  zoom,
  children,
}) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      top: y * zoom.value + offsetY.value,
      left: x * zoom.value + offsetX.value,
    };
  });

  const handleOnPress = useCallback(() => {
    onPress(id);
  }, [id, onPress]);

  return (
    <Animated.View testID="map-item" style={[animatedStyles, styles.main]}>
      <TouchableOpacity onPress={handleOnPress}>{children}</TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    position: "absolute",
  },
});

export default memo(MapItem);
