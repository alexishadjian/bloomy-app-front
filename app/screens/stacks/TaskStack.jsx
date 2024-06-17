import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TaskScreen from "../TaskScreen";

const Stack = createNativeStackNavigator();

export default function TaskStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="task" component={TaskScreen} />
    </Stack.Navigator>
  );
};