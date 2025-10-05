import { View } from "react-native";
import { AlertEntry } from './components/AlertEntry';
import SupabaseTest from './components/SupabaseTest';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <SupabaseTest/>
      <AlertEntry />
    </View>
  );
}
