import { Room } from "@/features/reservation/domain/Room";
import { FC, memo } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from "react-native";

type RoomButtonProps = {
  id: string;
  name: string;
  onPress: (id: string) => void;
  selected: boolean;
};

const RoomButton: FC<RoomButtonProps> = ({ id, name, onPress, selected }) => {
  return (
    <TouchableOpacity
      style={[roomButtonStyles.main, !selected && roomButtonStyles.no_selected]}
      onPress={() => onPress(id)}
    >
      <Text style={roomButtonStyles.text}>{name}</Text>
    </TouchableOpacity>
  );
};

const roomButtonStyles = StyleSheet.create({
  main: { marginHorizontal: 8, paddingVertical: 8 },
  no_selected: { opacity: 0.2 },
  text: { fontSize: 16, textTransform: "uppercase" },
});

type RoomSelectorProps = {
  onPressRoom: (roomId: string) => void;
  style?: ViewStyle;
  rooms: Room[];
  selectedRoomId: string;
};

const RoomSelector: FC<RoomSelectorProps> = ({
  onPressRoom,
  rooms,
  style,
  selectedRoomId,
}) => {
  return (
    <ScrollView
      contentContainerStyle={roomSelectorStyles.containerStyle}
      horizontal
      style={[roomSelectorStyles.main, style]}
      showsHorizontalScrollIndicator={false}
    >
      {rooms.map((room) => (
        <RoomButton
          key={room.id}
          id={room.id}
          name={room.name}
          onPress={onPressRoom}
          selected={selectedRoomId === room.id}
        />
      ))}
    </ScrollView>
  );
};

const roomSelectorStyles = StyleSheet.create({
  main: {},
  containerStyle: {
    paddingHorizontal: 8,
  },
});

export default memo(RoomSelector);
