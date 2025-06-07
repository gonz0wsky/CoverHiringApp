import { colors } from "@/core/theme/atoms";
import { RoomTable } from "@/features/reservation/domain/RoomTable";
import { Circle, Paint, Text, useFont } from "@shopify/react-native-skia";
import { FC } from "react";
import { useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { ShapePositionProps } from "./ShapeProps";

const SIZE = 120;
const FONT_SIZE = 14;

const centerString = (maxLength: number, str: string) => {
  if (!str) return " ".repeat(maxLength);

  let truncated = str.length > maxLength ? str.slice(0, maxLength) : str;

  const totalPadding = maxLength - truncated.length;
  const padLeft = Math.floor(totalPadding / 2);
  const padRight = totalPadding - padLeft;

  return " ".repeat(padLeft) + truncated + " ".repeat(padRight);
};

type CircleShapeProps = {
  position: ShapePositionProps;
  table: RoomTable;
};
const CircleShape: FC<CircleShapeProps> = ({
  position: { x, y, offsetX, offsetY, zoom },
  table: { id, reservedBy },
}) => {
  const font = useFont(
    require("@/assets/fonts/SpaceMono-Regular.ttf"),
    FONT_SIZE
  );

  const innerX = useSharedValue(x);
  const innerY = useSharedValue(y);

  const size = useSharedValue(SIZE);

  const textIdPositionX = useSharedValue(x);
  const textIdPositionY = useSharedValue(y);

  const textIdPositionActiveX = useSharedValue(x);
  const textIdPositionActiveY = useSharedValue(y);

  const textNamePositionX = useSharedValue(x);
  const textNamePositionY = useSharedValue(y);

  useAnimatedReaction(
    () => ({
      offsetXPosition: offsetX.value,
      offsetYPosition: offsetY.value,
    }),
    ({ offsetXPosition, offsetYPosition }) => {
      innerX.value = x * zoom.value + offsetXPosition;
      innerY.value = y * zoom.value + offsetYPosition;
      size.value = SIZE * zoom.value;

      textIdPositionX.value = innerX.value - 23;
      textIdPositionY.value = innerY.value + 5;

      textIdPositionActiveX.value = innerX.value - 22;
      textIdPositionActiveY.value = innerY.value - 5;

      textNamePositionX.value = innerX.value - 37;
      textNamePositionY.value = innerY.value + 14;
    },
    []
  );

  return (
    <Circle
      r={size}
      cx={innerX}
      cy={innerY}
      color={!!reservedBy ? colors.yellow : colors.green}
    >
      <Paint color={colors.black} style="stroke" strokeWidth={2} />
      {!reservedBy && (
        <Text
          x={textIdPositionX}
          y={textIdPositionY}
          text={centerString(6, id)}
          font={font}
          color={colors.black}
        />
      )}
      {!!reservedBy && (
        <>
          <Text
            x={textIdPositionActiveX}
            y={textIdPositionActiveY}
            text={centerString(6, id)}
            font={font}
            color={colors.black}
          />
          <Text
            x={textNamePositionX}
            y={textNamePositionY}
            text={centerString(10, reservedBy)}
            font={font}
            color={colors.black}
          />
        </>
      )}
    </Circle>
  );
};

export default CircleShape;
