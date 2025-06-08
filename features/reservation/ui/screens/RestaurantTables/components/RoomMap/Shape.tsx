import { colors } from "@/core/theme/atoms";
import { RoomTable } from "@/features/reservation/domain/RoomTable";
import { FC, memo } from "react";
import { StyleSheet } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

const SIZE = 40;
const FONT_SIZE = 4;

type ShapeProps = {
  roomTable: RoomTable;
  variant: "circle" | "square" | "rectangle";
  zoom: SharedValue<number>;
};

const Shape: FC<ShapeProps> = ({ roomTable, zoom, variant }) => {
  const animatedStyles = useAnimatedStyle(() => {
    const styles = {
      circle: {
        height: SIZE * zoom.value,
        width: SIZE * zoom.value,
        borderRadius: (SIZE * zoom.value) / 2,
      },
      square: {
        height: SIZE * zoom.value,
        width: SIZE * zoom.value,
      },
      rectangle: {
        height: SIZE * 2 * zoom.value,
        width: SIZE * zoom.value,
      },
    };

    return styles[variant];
  });

  const animatedTextStyles = useAnimatedStyle(() => {
    return {
      fontSize: FONT_SIZE * zoom.value,
    };
  });

  return (
    <Animated.View
      style={[
        styles.main,
        styles[variant],
        animatedStyles,
        roomTable.reservedBy && styles.reserved,
      ]}
    >
      <Animated.Text style={[animatedTextStyles]}>{roomTable.id}</Animated.Text>
      {roomTable.reservedBy && (
        <Animated.Text style={[animatedTextStyles]}>
          {roomTable.reservedBy}
        </Animated.Text>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  main: {
    backgroundColor: colors.green,
    borderWidth: 1,
    borderColor: colors.black,
    alignItems: "center",
    justifyContent: "center",
  },
  reserved: {
    backgroundColor: colors.yellow,
  },
  circle: { height: SIZE, width: SIZE, borderRadius: SIZE / 2 },
  square: { height: SIZE, width: SIZE },
  rectangle: { height: SIZE * 2, width: SIZE },
});

export default memo(Shape);
