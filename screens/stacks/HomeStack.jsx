import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../HomeScreen";

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Accueil" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default HomeStack;
