import { colors } from "@/core/theme/atoms";
import {
  forwardRef,
  memo,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import {
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type TableEditAlertState = {
  mode: "edit" | "create";
  id: string;
  name: string;
};

export interface TableEditAlertMethods {
  setTableInfo: (tableInfo: TableEditAlertState) => void;
}

const TableEditAlert = forwardRef<TableEditAlertMethods>((_, ref) => {
  const [tableInfo, setTableInfo] = useState<TableEditAlertState | null>();

  useImperativeHandle(ref, () => ({
    setTableInfo,
  }));

  // this form should be controlled by a form hook and should be validated with zod
  const handleOnTextInputChange = useCallback((text: string) => {
    setTableInfo((prev) => (prev ? { ...prev, name: text } : null));
  }, []);

  const handlePressSave = useCallback(() => {
    // this should call the api to save the reservation
    setTableInfo(null);
  }, []);

  const handlePressCancel = useCallback(() => {
    setTableInfo(null);
  }, []);

  if (!tableInfo) return null;

  // this should be inside a dictionary or translations files
  const title = {
    create: `Añadir reserva a la mesa ${tableInfo.id}`,
    edit: `Editar la reserva de la mesa ${tableInfo.id}`,
  };

  return (
    <View style={styles.main} pointerEvents="box-none">
      <KeyboardAvoidingView behavior="position">
        <View style={styles.content}>
          <Text>{title[tableInfo.mode]}</Text>
          <TextInput
            testID="table-edit-alert-input"
            style={styles.textInput}
            placeholder="Nombre de la reserva"
            value={tableInfo.name}
            onChangeText={handleOnTextInputChange}
          />
          <Button
            testID="table-edit-alert-save"
            title="Guardar"
            onPress={handlePressSave}
          />
          <Button
            testID="table-edit-alert-cancel"
            title="Cancelar"
            onPress={handlePressCancel}
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
});

TableEditAlert.displayName = "TableEditAlert";

const styles = StyleSheet.create({
  main: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `${colors.black}70`,
    alignContent: "center",
    justifyContent: "center",
    padding: 16,
  },
  content: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 8,
    gap: 16,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
});

export default memo(TableEditAlert);
