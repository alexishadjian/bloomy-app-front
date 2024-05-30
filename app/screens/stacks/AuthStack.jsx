import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../auth/RegisterScreen";
import LoginScreen from "../auth/LoginScreen";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="register" component={RegisterScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
