import type { StyleProp, ViewStyle } from "react-native";

import type { icons } from "./variants";

export type Props = IconProps & {
  name: IconName;
};

export type IconName = keyof typeof icons;

export type IconProps = {
  active?: boolean;
  size?: number;
  color?: string;
  style?: StyleProp<ViewStyle>;
};
