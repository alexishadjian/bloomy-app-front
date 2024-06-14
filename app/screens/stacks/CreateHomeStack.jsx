import { createNativeStackNavigator } from "@react-navigation/native-stack";

import CreateHomeScreen from "../createHome/CreateHomeScreen";
import JoinHomeScreen from "../createHome/JoinHomeScreen";

const Stack = createNativeStackNavigator();

export default function CreateHomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="createHome" component={CreateHomeScreen} />
      <Stack.Screen name="joinHome" component={JoinHomeScreen} />
    </Stack.Navigator>
  );
};