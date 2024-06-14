import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SettingsScreen from "../SettingsScreen";

const Stack = createNativeStackNavigator();

export default function SettingsStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="task" component={SettingsScreen} />
    </Stack.Navigator>
  );
};