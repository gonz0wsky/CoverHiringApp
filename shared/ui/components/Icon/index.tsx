import type { FC } from "react";

import type { Props } from "./types";
import { icons } from "./variants";

const Icon: FC<Props> = ({ name, ...props }) => {
  const IconComponent = icons[name];

  return <IconComponent {...props} />;
};

export default Icon;
