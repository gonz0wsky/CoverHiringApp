import { colors } from "@/core/theme/atoms";
import Icon from "@/shared/ui/components/Icon";
import { dateToString } from "@/shared/utils/date";
import { addDays } from "date-fns";
import { FC, memo, useCallback, useEffect, useMemo, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
  View,
  ViewStyle,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

type ButtonProps = {
  position: "left" | "right";
} & Pick<TouchableOpacityProps, "onPress">;

const SelectorButton: FC<ButtonProps> = ({ position, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={selectorButtonStyles.main}>
      {position === "left" && <Icon name="left-chevron" />}
      {position === "right" && <Icon name="right-chevron" />}
    </TouchableOpacity>
  );
};

const selectorButtonStyles = StyleSheet.create({
  main: {
    borderWidth: 1,
    borderColor: colors.black,
    height: 40,
    aspectRatio: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

type CalendarProps = { title: string; onPress: () => void };

const Calendar: FC<CalendarProps> = ({ title, onPress }) => {
  return (
    <TouchableOpacity style={calendarStyles.main} onPress={onPress}>
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const calendarStyles = StyleSheet.create({
  main: {
    height: 40,
    flex: 1,
    borderWidth: 1,
    borderColor: colors.black,
    marginHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});

type DateSelectorProps = {
  style?: ViewStyle;
  currentDate: Date;
  onDateChange: (date: Date) => void;
};

const DateSelector: FC<DateSelectorProps> = ({
  style,
  currentDate,
  onDateChange,
}) => {
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  const dateTitle = useMemo(
    () => dateToString(currentDate, "dd/MM/yyyy"),
    [currentDate]
  );

  useEffect(() => {
    onDateChange(currentDate);
  }, [currentDate, onDateChange]);

  const handlePressCalendarBox = useCallback(() => {
    setIsDatePickerVisible(true);
  }, []);

  const handleCalendarOnConfirm = useCallback(
    (date: Date) => {
      onDateChange(date);
      setIsDatePickerVisible(false);
    },
    [onDateChange]
  );

  const handleCalendarOnCancel = useCallback(() => {
    setIsDatePickerVisible(false);
  }, []);

  const handleIncreaseDate = useCallback(() => {
    onDateChange(addDays(currentDate, 1));
  }, [currentDate, onDateChange]);

  const handleDecreaseDate = useCallback(() => {
    onDateChange(addDays(currentDate, -1));
  }, [currentDate, onDateChange]);

  return (
    <View style={[dateSelectorStyles.main, style]}>
      <SelectorButton position="left" onPress={handleDecreaseDate} />
      <Calendar title={dateTitle} onPress={handlePressCalendarBox} />
      <SelectorButton position="right" onPress={handleIncreaseDate} />
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        date={currentDate}
        onConfirm={handleCalendarOnConfirm}
        onCancel={handleCalendarOnCancel}
      />
    </View>
  );
};

const dateSelectorStyles = StyleSheet.create({
  main: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default memo(DateSelector);
