import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../auth/RegisterScreen";

const Stack = createNativeStackNavigator();

export default function RegisterStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};