import type { FC } from "react";

import LeftChevron from "./icons/LeftChevron";
import RightChevron from "./icons/RightChevron";

import type { IconProps } from "./types";

const createSvgIcons = <T extends { [name: string]: FC<IconProps> }>(
  cfg: T
): Record<keyof T, FC<IconProps>> => cfg;

export const icons = createSvgIcons({
  "left-chevron": LeftChevron,
  "right-chevron": RightChevron,
});
